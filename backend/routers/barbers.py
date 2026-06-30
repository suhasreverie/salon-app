from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter()

@router.get("/")
def get_barbers(db: Session = Depends(get_db)):
    barbers = db.query(models.BarberProfile).join(models.User).filter(models.BarberProfile.is_active == True).all()
    # We join with User to get the name
    result = []
    for b in barbers:
        user = db.query(models.User).filter(models.User.id == b.user_id).first()
        result.append({
            "id": str(b.id),
            "name": user.name if user else "Unknown",
            "experience_years": b.experience_years,
            "rating": float(b.rating),
            "status": "Available" # In a real app we might infer from ChairStatus
        })
    return result

@router.get("/{barber_id}/queue")
def get_barber_queue(barber_id: str, db: Session = Depends(get_db)):
    # Returns today's appointments for this barber
    from datetime import date
    today = date.today()
    
    appointments = db.query(models.Appointment).filter(
        models.Appointment.barber_id == barber_id,
        models.Appointment.appointment_date == today,
        models.Appointment.status != models.AppointmentStatus.COMPLETED,
        models.Appointment.status != models.AppointmentStatus.CANCELLED
    ).order_by(models.Appointment.start_time).all()
    
    result = []
    for a in appointments:
        customer = db.query(models.User).filter(models.User.id == a.customer_id).first()
        service = db.query(models.Service).filter(models.Service.id == a.service_id).first()
        
        result.append({
            "id": str(a.id),
            "customer": customer.name if customer else "Unknown",
            "phone": customer.phone if customer else "",
            "service": service.name if service else "Unknown",
            "duration": f"{service.duration_minutes} min" if service else "",
            "time": a.start_time.strftime("%H:%M"),
            "status": a.status.value,
            "photo": "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=180&h=180&fit=crop&auto=format" # mock photo
        })
    return result

@router.put("/{barber_id}/status")
def update_barber_status(barber_id: str, status: str, db: Session = Depends(get_db)):
    # Mock endpoint for toggling break
    # In reality this would update ChairStatus
    return {"status": "updated", "new_status": status}
