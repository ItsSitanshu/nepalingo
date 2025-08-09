from pydantic import BaseModel, EmailStr
from typing import Optional, List
import uuid

class UserCreate(BaseModel):
    username: str
    email: EmailStr

class UserOut(BaseModel):
    id: uuid.UUID
    username: str
    email: EmailStr
    xp: int

    class Config:
        orm_mode = True

class LessonCreate(BaseModel):
    title: str
    type: str
    order_index: int = 0
    xp_reward: int = 10

class LessonOut(BaseModel):
    id: uuid.UUID
    title: str
    type: str
    order_index: int
    xp_reward: int

    class Config:
        orm_mode = True

class CourseCreate(BaseModel):
    language_name: str
    description: Optional[str] = None

class CourseOut(BaseModel):
    id: uuid.UUID
    language_name: str
    description: Optional[str]
    lessons: List[LessonOut] = []

    class Config:
        orm_mode = True
