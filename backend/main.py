from google.cloud.firestore_v1 import SERVER_TIMESTAMP
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
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
    allow_headers=["Authorization", "Content-Type"],
)

# Pydantic models for request validation
class StoryCreate(BaseModel):
    title: str
    description: str
    language: str
    category: str
    time_period: str
    tags: List[str] = []
    user_id: Optional[str] = None
    user_name: Optional[str] = None

class StoryUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    language: Optional[str] = None
    category: Optional[str] = None
    time_period: Optional[str] = None
    tags: Optional[List[str]] = None
    approved: Optional[bool] = None
    status: Optional[str] = None

@app.on_event("startup")
def startup_event():
    init_firebase()
    print("✅ Firebase initialized successfully")

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
            data.pop("embedding", None)  # hide embedding
            stories.append(data)
        return stories
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

@app.post("/stories")
def add_story(
    data: StoryCreate,
    authorization: str = Header(None),
    db=Depends(get_db)
):
    """
    Accepts story data from frontend, verifies Firebase token,
    calculates risk & embedding, and writes to Firestore.
    """
    try:
        if not authorization:
            raise HTTPException(status_code=401, detail="Authorization header missing")

        token = authorization.replace("Bearer ", "")
        user = verify_firebase_token(token)  # Returns dict with uid, email, etc.

        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")

        # Calculate extinction risk
        result = calculate_extinction_risk(data.description, data.language)

        # Generate embedding
        embedding = embed_text(data.description)
        print(f"🔍 Embedding shape: {embedding.shape}, type: {type(embedding)}")
        
        # Convert to list and verify it's 1D
        embedding_list = embedding.tolist()
        print(f"🔍 Embedding list length: {len(embedding_list)}, type: {type(embedding_list)}")
        print(f"🔍 First element type: {type(embedding_list[0]) if embedding_list else 'empty'}")

        # Prepare Firestore document
        story_data = {
            "title": data.title,
            "description": data.description,
            "language": data.language,
            "category": data.category,
            "time_period": data.time_period,
            "tags": data.tags,
            "user_id": user["uid"],
            "user_name": user.get("displayName") or user.get("email"),
            "embedding": embedding_list,  # 1D list for Firestore
            "risk_level": result["level"],  # ✅ FIXED: Text label (High, Medium, Low)
            "risk_score": result["score"],  # ✅ FIXED: Numeric value (0.0-1.0)
            "digital_presence_score": result["components"]["digital"]["score"],
            "created_at": SERVER_TIMESTAMP,
            "updated_at": SERVER_TIMESTAMP,
            "status": "pending",
            "approved": False
        }

        print(f"🔍 About to write to Firestore...")
        print(f"🔍 Story data keys: {story_data.keys()}")
        
        # Write to Firestore
        doc_ref = db.collection("stories").document()
        print(f"🔍 Document reference created: {doc_ref.id}")
        
        doc_ref.set(story_data)
        print(f"✅ Story saved to Firestore with ID: {doc_ref.id}")

        return {
            "message": f"Story successfully added with ID: {doc_ref.id}",
            "risk_level": result["level"],
            "risk_score": result["score"],
            "components": result["components"]
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"❌ Failed to save story: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/stories/{story_id}")
def update_story(
    story_id: str,
    data: StoryUpdate,
    authorization: str = Header(None),
    db=Depends(get_db)
):
    try:
        if not authorization:
            raise HTTPException(status_code=401, detail="Authorization header missing")
        token = authorization.replace("Bearer ", "")
        user = verify_firebase_token(token)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")

        doc_ref = db.collection("stories").document(story_id)
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Story not found")

        existing_data = doc.to_dict()
        is_admin = user.get("role") == "admin"

        # Only owner or admin can update
        if existing_data.get("user_id") != user["uid"] and not is_admin:
            raise HTTPException(status_code=403, detail="Not authorized to update this story")

        update_data = {"updated_at": SERVER_TIMESTAMP}

        # Recalculate risk if description changed
        if data.description and data.description != existing_data.get("description"):
            language = data.language if data.language else existing_data.get("language")
            result = calculate_extinction_risk(data.description, language)
            update_data.update({
                "risk_level": result["level"],  # ✅ FIXED: Text label
                "risk_score": result["score"],  # ✅ FIXED: Numeric value
                "digital_presence_score": result["components"]["digital"]["score"],
                "embedding": embed_text(data.description).tolist(),
                "description": data.description,
            })

        # Update other fields (including admin approval)
        if data.title is not None:
            update_data["title"] = data.title
        if data.language is not None:
            update_data["language"] = data.language
        if data.category is not None:
            update_data["category"] = data.category
        if data.time_period is not None:
            update_data["time_period"] = data.time_period
        if data.tags is not None:
            update_data["tags"] = data.tags
        if data.approved is not None:
            update_data["approved"] = data.approved
        if data.status is not None:
            update_data["status"] = data.status

        doc_ref.update(update_data)
        print(f"✅ Story {story_id} updated successfully")
        return {"message": "Story updated successfully"}

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"❌ Failed to update story: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/stories/{story_id}")
def delete_story(story_id: str, authorization: str = Header(None), db=Depends(get_db)):
    try:
        if not authorization:
            raise HTTPException(status_code=401, detail="Authorization header missing")
        token = authorization.replace("Bearer ", "")
        user = verify_firebase_token(token)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")

        doc_ref = db.collection("stories").document(story_id)
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Story not found")

        # Only owner or admin can delete
        is_admin = user.get("role") == "admin"
        if doc.to_dict().get("user_id") != user["uid"] and not is_admin:
            raise HTTPException(status_code=403, detail="Not authorized to delete this story")

        doc_ref.delete()
        print(f"✅ Story {story_id} deleted successfully")
        return {"message": "Story deleted successfully"}

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"❌ Failed to delete story: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))