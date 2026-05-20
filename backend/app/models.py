from app.database import Base
from sqlalchemy import Column, Integer, String
from flask_login import UserMixin

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True)
    company = Column(String)
    role = Column(String)
    description = Column(String)
    status = Column(String(50), default="Applied")


class User(UserMixin, Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String(100), unique=True)
    password = Column(String(200))
