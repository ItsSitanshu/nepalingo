from fastapi import FastAPI
from .database import engine
from .models import Base
from .routers import courses, users
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield                 

app = FastAPI(title="Nepalingo API", lifespan=lifespan)

app.include_router(users.router)
app.include_router(courses.router)

@app.get("/")
async def root():
    return {"message": "Nepalingo backend running"}
