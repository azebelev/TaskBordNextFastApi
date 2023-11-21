from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    completed = Column(Boolean, default=False)
    priority = Column(Integer)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))
    user = relationship("User", back_populates="tasks")