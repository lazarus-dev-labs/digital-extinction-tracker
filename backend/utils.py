from typing import List
from fastapi import Request, HTTPException
import firebase_admin, os
from firebase_admin import credentials, auth, firestore
from dotenv import load_dotenv
from typing import List, Optional

load_dotenv()

db: Optional[firestore.client] | None = None

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


def calculate_risk_score_and_level(text: str, language: str, digital_refs: int) -> List[int | str]:
    score = 0
    risk_level = ""

    if len(text) < 50:
        score += 3
    if language == "rare":
        score += 3
    if digital_refs < 5:
        score += 2

    if score >= 7:
        risk_level = "High"
    elif score >= 4:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return [score, risk_level]
