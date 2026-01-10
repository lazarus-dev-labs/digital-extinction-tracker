from typing import List
from fastapi import Request, HTTPException
import firebase_admin, os, langid, requests, faiss, numpy as np, regex as re
from firebase_admin import credentials, auth, firestore
from dotenv import load_dotenv
from typing import List, Optional
from google.cloud.firestore_v1 import Client
from sentence_transformers import SentenceTransformer
from faiss import IndexFlatL2

load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY")
SEARCH_ENGINE_ID = os.getenv("SEARCH_ENGINE_ID")
URL = "https://www.googleapis.com/customsearch/v1"

LANG_RARITY: dict[str, float] = {
    "sinhala": 1.0, 
    "tamil": 0.8, 
    "english": 0.1
}

db: Optional[Client] | None = None

embedding_model: SentenceTransformer = SentenceTransformer("all-MiniLM-L6-v2")


def verify_firebase_token(request: Request) -> dict | None:
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing Authorization")
    parts = auth_header.split()
    if parts[0] != "Bearer" or len(parts) != 2:
        raise HTTPException(status_code=401, detail="Invalid Authorization")
    token = parts[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))


def init_firebase() -> None:
    global db
    try:
        if not firebase_admin._apps:
            firebase_cred = os.getenv("FIREBASE_APPLICATION_CREDENTIALS")

            if firebase_cred is None:
                raise RuntimeError("FIREBASE_APPLICATION_CREDENTIALS are missing")

            cred = credentials.Certificate(firebase_cred)
            firebase_admin.initialize_app(cred)
            print("Firebase initilized successfully")

            db = firestore.client()
            print("Firestore initilized successfully")

    except Exception as e:
        print("Firebase initialization failed:", e)
        raise e


def get_db() -> Client:
    if db is None:
        raise RuntimeError("Firestore not initialized. Call init_firebase() first.")
    return db


# text character length
def risk_based_on_length(text: str) -> List[float]:
    word_count = len(text.split())

    if word_count <= 5:
        risk = 1.0
    elif word_count <= 15:
        risk = 0.7
    elif word_count <= 50:
        risk = 0.4
    else:
        risk = 0.2

    return [word_count, risk]


# language detection
def language_detection(lang: str) -> float:
    return LANG_RARITY.get(lang.lower(), 0.0)


# Count no of digital references
def digital_reference_rarity(text: str) -> List[int | float]:
    # Detect language first
    lang, conf = langid.classify(text)

    if lang == "si":
        words = re.findall(r"[\u0D80-\u0DFF]+", text)
        if not words:
            return [0, 0]
        keywords = " ".join(words[:3])
        site_search = "si.wikipedia.org"  # focus on Sinhala sources

    else:
        words = re.findall(r"\b\w+\b", text)
        if not words:
            return [0, 0]
        keywords = " ".join(words[:5])
        site_search = None

    # print(f"Language: {lang}, Keywords: {keywords}")

    params = {"q": keywords, "key": API_KEY, "cx": SEARCH_ENGINE_ID}

    if site_search:
        params["siteSearch"] = site_search

    try:
        response = requests.get(URL, params=params, timeout=5)
        results = response.json()
        total_matches = results.get("searchInformation", {}).get("totalResults", "0")
        count = int(total_matches)

        if count == 0:
            result = 1.0
        elif count < 5:
            result = 0.7
        elif count < 20:
            result = 0.3
        else:
            result = 0.0

        return [count, result]
    

    except Exception as e:
        print("An exception occurred while counting references:", e)
        raise e


# Vectorize text
def embed_text(text: str) -> np.ndarray:
    vec = embedding_model.encode([text])
    return vec.astype("float32")


# extract the embeddings from the database
def load_local_story_vectors() -> List[IndexFlatL2 | int]:
    # Fetch all documents in the 'stories' collection
    docs = db.collection("cultural_items").stream()
    vectors = []

    for doc in docs:
        data = doc.to_dict()
        embedding = data.get("embedding")
        if embedding:
            # Convert to float32 array, just in case
            vectors.append(np.array(embedding, dtype="float32"))

    if not vectors:
        pass

    # Stack vectors into a 2D numpy array (n_vectors x dim)
    vectors_np = np.vstack(vectors)

    # Initialize FAISS index
    dim = vectors_np.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(vectors_np)

    return [index, len(vectors)]


def local_similarity_score(text: str) -> float:

    index, total_docs = load_local_story_vectors()

    if index is None or total_docs == 0:
        return 1.0  # no local knowledge = high risk

    query_vec = embed_text(text)
    D, _ = index.search(query_vec, k=3)

    min_distance = float(D[0][0])

    if min_distance < 0.2:
        return 0.0  # already documented / identical
    elif min_distance < 0.35:
        return 0.25  # very similar
    elif min_distance < 0.5:
        return 0.5  # somewhat documented
    elif min_distance < 0.65:
        return 0.75  # mostly unique
    else:
        return 1.0  # completely rare / locally rare

def calculate_extinction_risk(text: str, lang: str) -> dict:

    _, length_risk = risk_based_on_length(text)
    lang_risk = language_detection(lang)
    digital_reference_count, digital_risk = digital_reference_rarity(text)
    local_risk = local_similarity_score(text)

    final_score = (
        0.20 * length_risk + 0.20 * lang_risk + 0.35 * digital_risk + 0.25 * local_risk
    )

    if final_score >= 0.75:
        level = "Critical"
    elif final_score >= 0.5:
        level = "High"
    elif final_score >= 0.3:
        level = "Medium"
    else:
        level = "Low"

    return {
        "score": round(final_score, 3),
        "level": level,
        "components": {
            "length": length_risk,
            "language": lang_risk,
            "digital": {
                "score": digital_risk,
                "sources_matched": digital_reference_count,
            },
            "local": local_risk,
        },
    }