from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from . import models, schemas

async def create_user(db: AsyncSession, user_in: schemas.UserCreate):
    user = models.User(username=user_in.username, email=user_in.email)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

async def get_user_by_id(db: AsyncSession, user_id):
    result = await db.execute(select(models.User).where(models.User.id == user_id))
    return result.scalars().first()

async def get_user_by_username(db: AsyncSession, username: str):
    result = await db.execute(select(models.User).where(models.User.username == username))
    return result.scalars().first()

async def create_course(db: AsyncSession, course_in: schemas.CourseCreate, creator_id=None):
    course = models.Course(
        language_name=course_in.language_name,
        description=course_in.description,
        created_by=creator_id
    )
    db.add(course)
    await db.commit()
    await db.refresh(course)
    return course

async def list_courses(db: AsyncSession):
    result = await db.execute(select(models.Course))
    return result.scalars().all()

async def get_course(db: AsyncSession, course_id):
    result = await db.execute(select(models.Course).where(models.Course.id == course_id))
    return result.scalars().first()

async def create_lesson(db: AsyncSession, lesson_in: schemas.LessonCreate, course_id):
    lesson = models.Lesson(course_id=course_id, **lesson_in.dict())
    db.add(lesson)
    await db.commit()
    await db.refresh(lesson)
    return lesson

async def list_lessons(db: AsyncSession, course_id):
    result = await db.execute(select(models.Lesson).where(models.Lesson.course_id == course_id))
    return result.scalars().all()
