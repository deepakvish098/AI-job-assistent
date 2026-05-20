from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

engine = create_engine(os.getenv("DATABASE_URL"))
SessionLocal = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass

try:
    with engine.connect() as connection:
        print("✅ Database connected successfully!")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
