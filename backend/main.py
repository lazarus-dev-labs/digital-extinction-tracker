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
            data = doc.to_dict()
            data["id"] = doc.id
            del data["embedding"]
            stories.append(data)
        return stories
    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")


@app.get("/stories/{story_id}")
def get_story(story_id: str, db=Depends(get_db)):
    try:
        doc_ref = db.collection("stories").document(story_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Story not found")
            
        data = doc.to_dict()
        data["id"] = doc.id
        if "embedding" in data:
            del data["embedding"]
            
        return data

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


@app.put("/stories/{story_id}")
def update_story(story_id: str, data: dict, user=Depends(verify_firebase_token), db=Depends(get_db)):
    try:
        doc_ref = db.collection("stories").document(story_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Story not found")
            
        existing_data = doc.to_dict()
        
        # Verify ownership
        if existing_data.get("user_id") != user["uid"]:
            raise HTTPException(status_code=403, detail="Not authorized to update this story")
        
        # Update fields
        update_data = {
            "updated_at": SERVER_TIMESTAMP
        }
        
        # Recalculate risk if description changes
        if "description" in data and data["description"] != existing_data.get("description"):
            result = calculate_extinction_risk(data["description"], data.get("language", existing_data.get("language")))
            
            update_data["risk_level"] = result["score"]
            update_data["risk_score"] = result["level"]
            update_data["digital_presence_score"] = result["components"]["digital"]["score"]
            
            # Re-embed
            embedding = embed_text(data["description"])
            update_data["embedding"] = embedding.tolist()[0]
            update_data["description"] = data["description"]
            
        # Update other allowed fields (excluding protected ones)
        protected_fields = ["id", "user_id", "created_at", "embedding", "risk_level", "risk_score", "digital_presence_score"]
        for key, value in data.items():
            if key not in protected_fields and key != "description":
                update_data[key] = value
                
        doc_ref.update(update_data)
        
        return {"message": "Story updated successfully"}

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")


@app.delete("/stories/{story_id}")
def delete_story(story_id: str, user=Depends(verify_firebase_token), db=Depends(get_db)):
    try:
        doc_ref = db.collection("stories").document(story_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Story not found")
            
        # existing_data = doc.to_dict()
        
        # Verify ownership
        # if existing_data.get("user_id") != user["uid"]:
        #     raise HTTPException(status_code=403, detail="Not authorized to delete this story")
            
        doc_ref.delete()
        
        return {"message": "Story deleted successfully"}

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
