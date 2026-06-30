from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter()

@router.get("/")
def get_services(db: Session = Depends(get_db)):
    services = db.query(models.Service).filter(models.Service.is_active == True).all()
    return [
        {
            "id": str(s.id),
            "name": s.name,
            "description": s.description,
            "duration_minutes": s.duration_minutes,
            "price": float(s.price)
        }
        for s in services
    ]
