from sqlalchemy.orm import Session
from models.user import User
from database.database import get_db

class UserRepository:
    def __init__(self):
        self.db: Session = get_db().__next__()
    
    def get_user_by_email(self, email: int):
        user = self .db.query(User).filter(User.email == email).first() 
        return user

    def add_user(self, new_user: User):
        self.db.add(new_user)
        self.db.commit()

user_repository = UserRepository()