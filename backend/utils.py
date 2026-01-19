from typing import List
from fastapi import Request, HTTPException
import firebase_admin, os, requests, faiss, numpy as np, regex as re
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

LANG_RARITY: dict[str, float] = {"sinhala": 1.0, "tamil": 0.8, "english": 0.1}

db: Optional[Client] | None = None

embedding_model: SentenceTransformer = SentenceTransformer("all-MiniLM-L6-v2")


def verify_firebase_token(token: str) -> dict | None:
    """
    Verify Firebase ID token and return decoded user information.
    
    Args:
        token (str): The Firebase ID token string (without "Bearer " prefix)
        
    Returns:
        dict: Decoded token containing user info (uid, email, etc.)
        
    Raises:
        HTTPException: If token is invalid or verification fails
    """
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")


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
    return LANG_RARITY.get(lang, 0.0)


# Count no of digital references
def digital_reference_rarity(text: str, lang: str) -> List[int | float]:
    # Detect language first

    if lang == "sinhala":
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
    """
    Generate embedding vector for text.
    Returns a 1D numpy array (not nested).
    """
    vec = embedding_model.encode(text)  # Remove list wrapper to get 1D array
    return vec.astype("float32")


# extract the embeddings from the database
def load_local_story_vectors() -> List[IndexFlatL2 | int]:
    try:
        # Fetch all documents in the 'stories' collection
        docs = db.collection("cultural_items").stream()
        vectors = []

        for doc in docs:
            data = doc.to_dict()
            embedding = data.get("embedding")
            if embedding:
                # Convert to float32 array
                vec = np.array(embedding, dtype="float32")
                # Ensure it's 1D - if it's already 1D, this does nothing
                if vec.ndim > 1:
                    vec = vec.flatten()
                vectors.append(vec)

        if not vectors:
            return [None, 0]

        # Stack vectors into a 2D numpy array (n_vectors x dim)
        vectors_np = np.vstack(vectors)

        # Initialize FAISS index
        dim = vectors_np.shape[1]
        index = faiss.IndexFlatL2(dim)
        index.add(vectors_np)

        return [index, len(vectors)]

    except Exception as e:
        print("Encountered an Error while receiving local story vectors", e)
        raise e


def local_similarity_score(text: str) -> float:

    index, total_docs = load_local_story_vectors()

    if index is None or total_docs == 0:
        return 1.0  # no local knowledge = high risk

    query_vec = embed_text(text)
    # FAISS search expects 2D array (1 query x dimensions)
    query_vec_2d = query_vec.reshape(1, -1)
    D, _ = index.search(query_vec_2d, k=3)

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

    lang = lang.lower()
    _, length_risk = risk_based_on_length(text)
    lang_risk = language_detection(lang)
    digital_reference_count, digital_risk = digital_reference_rarity(text, lang)
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