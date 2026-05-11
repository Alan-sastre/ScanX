import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, JSON, Boolean, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Analysis(Base):
    __tablename__ = 'analyses'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    type = Column(String(10), nullable=False) # 'url' or 'file'
    target = Column(Text, nullable=False)
    verdict = Column(String(50), nullable=False)
    threat_type = Column(String(100), nullable=True)
    danger_level = Column(Integer, nullable=False, default=0)
    explanation = Column(Text, nullable=True)
    details = Column(JSON, nullable=True)
    virustotal_used = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
