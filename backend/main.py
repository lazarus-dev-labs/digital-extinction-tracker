from google.cloud.firestore_v1 import SERVER_TIMESTAMP
from fastapi import FastAPI, Depends
from utils import (
    verify_firebase_token,
    init_firebase,
    get_db,
    calculate_extinction_risk,
)


app = FastAPI()


@app.on_event("startup")
def startup_event():
    init_firebase()


@app.get("/")
def root():
    return {"message": "Welcome to the Digital Extinct Tracker"}


@app.get("/items")
def get_items(db=Depends(get_db)):
    if db is not None:
        items_ref = db.collection("cultural_items")
        items = []
        for doc in items_ref.stream():
            doc = doc.to_dict()
            del doc["embedding"]
            items.append(doc)
        return items
    return {"message": "Issue connecting to the database"}


@app.post("/items")
def add_item(data: dict, user=Depends(verify_firebase_token), db=Depends(get_db)):
    if db is not None:
        # calculate risk
        result = calculate_extinction_risk(data["description"], data["language"])

        risk_score = result["score"]
        risk_level = result["level"]
        risk_components = result["components"]
        digital_presence_score = risk_components["digital"]["score"]

        # assign data
        data["user_id"] = user["uid"]
        data["risk_level"] = risk_score
        data["risk_score"] = risk_level
        data["digital_presence_score"] = digital_presence_score
        data["user_id"] = "9RgLzrYBmFYzlIfgHeWjTGb84442"
        data["created_at"] = SERVER_TIMESTAMP
        data["updated_at"] = ""

        doc_ref = db.collection("cultural_items").document()
        doc_ref.set(data)

        return {
            "message": f"Entry successfully added {doc_ref.id}",
            "risk_level": risk_level,
            "risk_score": risk_score,
            "components": risk_components,
        }

    return {"message": "Issue connecting to the database"}