import enum
from sqlalchemy import Column, String, Integer, Numeric, Boolean, ForeignKey, Date, Time, Enum, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base

class UserRole(str, enum.Enum):
    CUSTOMER = "CUSTOMER"
    MANAGER = "MANAGER"
    BARBER = "BARBER"

class AppointmentStatus(str, enum.Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    ARRIVED = "ARRIVED"
    IN_CHAIR = "IN_CHAIR"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    DELAYED = "DELAYED"

class ChairStatus(str, enum.Enum):
    AVAILABLE = "AVAILABLE"
    SERVING_CUSTOMER = "SERVING_CUSTOMER"
    ON_BREAK = "ON_BREAK"

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(50))
    role = Column(Enum(UserRole), default=UserRole.CUSTOMER)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("CURRENT_TIMESTAMP"))

class BarberProfile(Base):
    __tablename__ = "barber_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    experience_years = Column(Integer, default=0)
    rating = Column(Numeric(3, 2), default=0.0)
    is_active = Column(Boolean, default=True)

class Service(Base):
    __tablename__ = "services"
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    name = Column(String(255), nullable=False)
    description = Column(String)
    duration_minutes = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    is_active = Column(Boolean, default=True)

class Chair(Base):
    __tablename__ = "chairs"
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    name = Column(String(50), nullable=False)
    current_barber_id = Column(UUID(as_uuid=True), ForeignKey("barber_profiles.id", ondelete="SET NULL"))
    status = Column(Enum(ChairStatus), default=ChairStatus.AVAILABLE)

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    customer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    barber_id = Column(UUID(as_uuid=True), ForeignKey("barber_profiles.id"), nullable=False)
    service_id = Column(UUID(as_uuid=True), ForeignKey("services.id"), nullable=False)
    appointment_date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.PENDING)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("CURRENT_TIMESTAMP"))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text("CURRENT_TIMESTAMP"))
