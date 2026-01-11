from pydantic import BaseModel, EmailStr
from typing import Optional, Literal, List
from datetime import datetime

# Response Schema
class Response(BaseModel):
    status: Literal["error", "success"]
    message: str


# Story Schema
class StoryBase(BaseModel):
   title: str
   category: str
   description: str
   region: str
   tags: Optional[List[str]] = None
   language: str

class StoryCreate(StoryBase):
    pass

class StoryData(StoryBase):
    risk_scoreL: float
    created_at: datetime
    updated_at: datetime
    user_id: str
    digital_presence_score: float
    risk_level: float

class StoryResponse(BaseModel):
    pass


# User Schema
class UserBase(BaseModel):
    pass

class UserCreate(StoryBase):
    pass

class UserData(StoryBase):
    pass

class UserResponse(BaseModel):
    pass