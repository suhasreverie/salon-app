from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from websocket_manager import manager
from datetime import date, time
import models

router = APIRouter()

class AppointmentCreate(BaseModel):
    customer_id: str
    barber_id: str
    service_id: str
    appointment_date: date
    start_time: time
    end_time: time

class AppointmentStatusUpdate(BaseModel):
    status: str

@router.get("/")
def get_appointments(db: Session = Depends(get_db)):
    appointments = db.query(models.Appointment).all()
    result = []
    for a in appointments:
        customer = db.query(models.User).filter(models.User.id == a.customer_id).first()
        barber = db.query(models.BarberProfile).filter(models.BarberProfile.id == a.barber_id).first()
        barber_user = db.query(models.User).filter(models.User.id == barber.user_id).first() if barber else None
        service = db.query(models.Service).filter(models.Service.id == a.service_id).first()
        
        result.append({
            "id": str(a.id),
            "customer": customer.name if customer else "Unknown",
            "barber": barber_user.name if barber_user else "Unknown",
            "service": service.name if service else "Unknown",
            "time": a.start_time.strftime("%H:%M"),
            "status": a.status.value,
        })
    return result

@router.post("/")
async def create_appointment(appt: AppointmentCreate, db: Session = Depends(get_db)):
    new_appt = models.Appointment(
        customer_id=appt.customer_id,
        barber_id=appt.barber_id,
        service_id=appt.service_id,
        appointment_date=appt.appointment_date,
        start_time=appt.start_time,
        end_time=appt.end_time,
        status=models.AppointmentStatus.CONFIRMED
    )
    db.add(new_appt)
    db.commit()
    db.refresh(new_appt)
    
    # Notify all clients
    await manager.broadcast({"type": "NEW_APPOINTMENT", "payload": {"id": str(new_appt.id)}})
    return {"message": "Appointment created", "id": str(new_appt.id)}

@router.put("/{appt_id}/status")
async def update_appointment_status(appt_id: str, update: AppointmentStatusUpdate, db: Session = Depends(get_db)):
    appt = db.query(models.Appointment).filter(models.Appointment.id == appt_id).first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
        
    try:
        new_status = models.AppointmentStatus(update.status)
        appt.status = new_status
        db.commit()
        
        # Broadcast the change
        await manager.broadcast({
            "type": "APPOINTMENT_STATUS_UPDATED",
            "payload": {"id": str(appt.id), "status": new_status.value}
        })
        return {"message": "Status updated"}
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid status")
