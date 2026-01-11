from google.cloud.firestore_v1 import SERVER_TIMESTAMP
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from utils import (
    verify_firebase_token,
    init_firebase,
    get_db,
    calculate_extinction_risk,
    embed_text
)
from dotenv import load_dotenv
import os

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=[
        "Authorization",
        "Content-Type",
    ],
)



@app.on_event("startup")
def startup_event():
    init_firebase()


@app.get("/")
def root():
    return {"message": "Welcome to the Digital Extinct Tracker"}


@app.get("/stories")
def get_stories(db=Depends(get_db)):
    try:
        stories_ref = db.collection("stories")
        stories = []
        for doc in stories_ref.stream():
            doc = doc.to_dict()
            del doc["embedding"]
            stories.append(doc)
        return stories
    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")


@app.post("/stories")
def add_item(data: dict, user=Depends(verify_firebase_token), db=Depends(get_db)):
    try:
        # calculate risk
        result = calculate_extinction_risk(data["description"], data["language"])

        risk_score = result["score"]
        risk_level = result["level"]
        risk_components = result["components"]
        digital_presence_score = risk_components["digital"]["score"]
        description = data['description']

        # assign data 
        data["user_id"] = user["uid"]

        embedding = embed_text(description)
        data['embedding'] = embedding.tolist()[0]
        data["risk_level"] = risk_score
        data["risk_score"] = risk_level
        data["digital_presence_score"] = digital_presence_score
        data["user_id"] = "9RgLzrYBmFYzlIfgHeWjTGb84442"
        data["created_at"] = SERVER_TIMESTAMP
        data["updated_at"] = ""

        doc_ref = db.collection("stories").document()
        doc_ref.set(data)

        return {
            "message": f"Entry successfully added {doc_ref.id}",
            "risk_level": risk_level,
            "risk_score": risk_score,
            "components": risk_components,
        }

    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")