from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, index=True)
    password = Column(String)
    joined_at = Column(DateTime, default=func.now())
    is_active = Column(Boolean, default=True)

    todos = relationship("Todo", back_populates="owner")


class Todo(Base):
    __tablename__ = "Todo"
    id = Column(Integer, index=True, primary_key=True)
    task = Column(String)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    owner_id = Column(Integer, ForeignKey("User.id"))
    owner = relationship("User", back_populates="todos")
