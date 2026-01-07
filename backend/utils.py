from typing import List
from fastapi import Request, HTTPException
import firebase_admin, os, langid
from firebase_admin import credentials, auth, firestore
from dotenv import load_dotenv
from typing import List, Optional

load_dotenv()

db: Optional[firestore.client] | None = None

lang_rarity: dict[str, float] = {
    "si" : 0.9,
    "ta" : 0.8,
    "en" : 0.1
}

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

    except Exception as e:
        print("Firebase initialization failed:", e)
        raise e


def get_db() -> firestore.client:
    if db is None:
        raise RuntimeError("Firestore not initialized. Call init_firebase() first.")
    return db


# text character length
def risk_based_on_length(text: str) -> List[float]:
    word_count = len(text.split())
    
    if word_count <= 5:
        risk = 0.9
    elif word_count <= 15:
        risk = 0.7
    elif word_count <= 50:
        risk = 0.4
    else:
        risk = 0.2
    
    return [word_count, risk]


# language detection
def language_detection(text: str) -> float:
    lang, conf = langid.classify(text)
    return lang_rarity.get(lang, 0.0)


# Count no of digital references
def digital_reference_rarity(text: str, max_results: int = 20) -> float:
    return 0.0


def calculate_risk_score_and_level(text: str) -> List[float | str]:
    score = 0
    risk_level = ""

    # Length risk
    _, length_risk = risk_based_on_length(text)
    score += length_risk

    # Language rarity
    lang_risk = language_detection(text)
    score += lang_risk

    # Digital references
    digital_risk = digital_reference_rarity(text)
    score += digital_risk

    if score >= 2.0:
        risk_level = "High"
    elif score >= 1.0:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return [score, risk_level]
