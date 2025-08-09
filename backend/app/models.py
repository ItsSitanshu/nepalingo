import uuid
from sqlalchemy import (
    Column, String, Text, Integer, ForeignKey, Index, UniqueConstraint
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(120), unique=True, nullable=False, index=True)
    xp = Column(Integer, default=0, nullable=False)

    courses = relationship(
        "Course",
        back_populates="creator",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, email={self.email})>"

class Course(Base):
    __tablename__ = "courses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    language_name = Column(String(80), nullable=False, index=True)
    description = Column(Text, nullable=True)

    created_by = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True
    )

    creator = relationship("User", back_populates="courses")

    lessons = relationship(
        "Lesson",
        back_populates="course",
        cascade="all, delete-orphan",
        passive_deletes=True,
        order_by="Lesson.order_index"
    )

    def __repr__(self):
        return f"<Course(id={self.id}, language_name={self.language_name})>"

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)

    course_id = Column(
        UUID(as_uuid=True),
        ForeignKey("courses.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    title = Column(String(120), nullable=False)
    type = Column(String(30), nullable=False)  # e.g., 'video', 'quiz', 'text', etc.
    order_index = Column(Integer, default=0, nullable=False)
    xp_reward = Column(Integer, default=10, nullable=False)

    course = relationship("Course", back_populates="lessons")

    __table_args__ = (
        UniqueConstraint('course_id', 'order_index', name='uix_course_lesson_order'),
    )

    def __repr__(self):
        return f"<Lesson(id={self.id}, title={self.title}, course_id={self.course_id})>"
