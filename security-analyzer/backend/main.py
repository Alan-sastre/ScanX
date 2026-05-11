from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
import json

from database import engine, get_db
import models
from analyzer import analyze_url, analyze_file

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="ScanX Security API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze/url")
def api_analyze_url(url: str = Form(...), virustotal_key: Optional[str] = Form(None), db: Session = Depends(get_db)):
    try:
        res = analyze_url(url, virustotal_key)
        db_analysis = models.Analysis(
            type="url",
            target=url,
            verdict=res["verdict"],
            threat_type=res["threat_type"],
            danger_level=res["danger_level"],
            explanation=res["explanation"],
            details=res["details"],
            virustotal_used=res["virustotal_used"]
        )
        db.add(db_analysis)
        db.commit()
        db.refresh(db_analysis)
        return db_analysis
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/analyze/file")
async def api_analyze_file(file: UploadFile = File(...), virustotal_key: Optional[str] = Form(None), db: Session = Depends(get_db)):
    try:
        content = await file.read()
        if len(content) > 50 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="El archivo excede el límite de 50MB")
            
        res = analyze_file(file.filename, content, file.content_type, virustotal_key)
        db_analysis = models.Analysis(
            type="file",
            target=file.filename,
            verdict=res["verdict"],
            threat_type=res["threat_type"],
            danger_level=res["danger_level"],
            explanation=res["explanation"],
            details=res["details"],
            virustotal_used=res["virustotal_used"]
        )
        db.add(db_analysis)
        db.commit()
        db.refresh(db_analysis)
        return db_analysis
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/history")
def get_history(db: Session = Depends(get_db)):
    return db.query(models.Analysis).order_by(models.Analysis.created_at.desc()).all()

@app.get("/history/{analysis_id}")
def get_analysis(analysis_id: str, db: Session = Depends(get_db)):
    analysis = db.query(models.Analysis).filter(models.Analysis.id == analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Análisis no encontrado")
    return analysis

@app.delete("/history/{analysis_id}")
def delete_analysis(analysis_id: str, db: Session = Depends(get_db)):
    analysis = db.query(models.Analysis).filter(models.Analysis.id == analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Análisis no encontrado")
    db.delete(analysis)
    db.commit()
    return {"message": "Registro eliminado"}
