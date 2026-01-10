from fastapi import FastAPI, Depends
from utils import verify_firebase_token, init_firebase, get_db


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
def add_item(data: dict, db=Depends(get_db)):
    if db is not None:
        data["user_id"] = "9RgLzrYBmFYzlIfgHeWjTGb84442"
        doc_ref = db.collection("cultural_items").document()
        doc_ref.set(data)
        return {"message" : f"Entry successfully added {doc_ref.id}"}
    return {"message": "Issue connecting to the database"}

# @app.post("/items")
# def add_item(data: dict, user=Depends(verify_firebase_token), db=Depends(get_db)):
#     if db is not None:
#         data["user_id"] = user["uid"]
#         doc_ref = db.collection("cl_vectors_test").document()
#         doc_ref.set(data)
#         return {"message" : "entry successfully added"}
#     return {"message": "Issue connecting to the database"}