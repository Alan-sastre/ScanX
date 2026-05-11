from database import SessionLocal, engine
import models
from datetime import datetime, timedelta

def seed_db():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    if db.query(models.Analysis).count() > 0:
        print("La base de datos ya contiene registros.")
        db.close()
        return

    now = datetime.utcnow()

    analyses = [
        models.Analysis(
            type="url", target="http://paypal-update-account.com", verdict="Phishing",
            threat_type="Phishing", danger_level=8, explanation="Se detectó keyword 'paypal' en dominio no oficial.",
            details=["Suspicious keyword 'paypal'", "Uses HTTP"], created_at=now - timedelta(days=1)
        ),
        models.Analysis(
            type="url", target="https://google.com", verdict="Seguro",
            threat_type="Ninguna", danger_level=0, explanation="Dominio seguro.",
            details=[], created_at=now - timedelta(hours=5)
        ),
        models.Analysis(
            type="url", target="http://192.168.1.100/login", verdict="Sospechoso",
            threat_type="Phishing", danger_level=6, explanation="Uso de IP como dominio y ruta de login.",
            details=["IP instead of domain", "Suspicious keyword 'login'"], created_at=now - timedelta(hours=2)
        ),
        models.Analysis(
            type="url", target="https://www.micros0ft.com/auth", verdict="Fraude",
            threat_type="Typosquatting", danger_level=9, explanation="Posible typosquatting de Microsoft.",
            details=["Typosquatting: microsoft", "Suspicious keyword 'auth'"], created_at=now - timedelta(minutes=30)
        ),
        models.Analysis(
            type="url", target="https://github.com", verdict="Seguro",
            threat_type="Ninguna", danger_level=0, explanation="No se detectaron anomalías.",
            details=[], created_at=now - timedelta(minutes=5)
        ),
        models.Analysis(
            type="file", target="invoice.pdf.exe", verdict="Malware",
            threat_type="Trojan/Dropper", danger_level=9, explanation="Doble extensión detectada y entropía alta.",
            details=["Executable extension", "MIME mismatch"], created_at=now - timedelta(days=2)
        ),
        models.Analysis(
            type="file", target="report_q3.docx", verdict="Sospechoso",
            threat_type="Macro Malware", danger_level=6, explanation="Se detectaron macros incrustadas.",
            details=["Possible malicious macros detected"], created_at=now - timedelta(hours=12)
        ),
        models.Analysis(
            type="file", target="photo.jpg", verdict="Limpio",
            threat_type="Ninguna", danger_level=1, explanation="Entropía normal, sin strings sospechosos.",
            details=["File entropy: 4.12"], created_at=now - timedelta(hours=1)
        )
    ]

    for a in analyses:
        db.add(a)

    db.commit()
    db.close()
    print("Base de datos poblada con éxito.")

if __name__ == "__main__":
    seed_db()
