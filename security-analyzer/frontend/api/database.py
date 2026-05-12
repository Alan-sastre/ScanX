from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base
import os

# On Vercel, we must use /tmp for SQLite to have write permissions, 
# but note that it is ephemeral (data is lost when the function sleeps).
if os.environ.get('VERCEL'):
    SQLALCHEMY_DATABASE_URL = "sqlite:////tmp/security_analyzer.db"
else:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./security_analyzer.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
