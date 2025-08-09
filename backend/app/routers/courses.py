from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from .. import schemas, crud
from ..database import get_db

router = APIRouter(prefix="/courses", tags=["courses"])

@router.post("/", response_model=schemas.CourseOut)
async def create_course(course_in: schemas.CourseCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_course(db, course_in)

@router.get("/", response_model=List[schemas.CourseOut])
async def list_courses(db: AsyncSession = Depends(get_db)):
    return await crud.list_courses(db)

@router.post("/{course_id}/lessons", response_model=schemas.LessonOut)
async def create_lesson(course_id: str, lesson_in: schemas.LessonCreate, db: AsyncSession = Depends(get_db)):
    course = await crud.get_course(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return await crud.create_lesson(db, lesson_in, course_id)

@router.get("/{course_id}/lessons", response_model=List[schemas.LessonOut])
async def list_lessons(course_id: str, db: AsyncSession = Depends(get_db)):
    return await crud.list_lessons(db, course_id)
