from database.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    password_hash = Column(String)
    email = Column(String)
    tasks = relationship("Task", back_populates="user", cascade="all, delete-orphan")
