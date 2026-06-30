-- schema.sql
-- Database schema for Salon App Operations

CREATE TYPE user_role AS ENUM ('CUSTOMER', 'MANAGER', 'BARBER');
CREATE TYPE appointment_status AS ENUM ('PENDING', 'CONFIRMED', 'ARRIVED', 'IN_CHAIR', 'COMPLETED', 'CANCELLED', 'DELAYED');
CREATE TYPE chair_status AS ENUM ('AVAILABLE', 'SERVING_CUSTOMER', 'ON_BREAK');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    role user_role DEFAULT 'CUSTOMER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE barber_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    experience_years INT DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 0.0,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE barber_services (
    barber_id UUID REFERENCES barber_profiles(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    PRIMARY KEY (barber_id, service_id)
);

CREATE TABLE chairs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL, -- e.g., 'Chair 1'
    current_barber_id UUID REFERENCES barber_profiles(id) ON DELETE SET NULL,
    status chair_status DEFAULT 'AVAILABLE'
);

CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    barber_id UUID NOT NULL REFERENCES barber_profiles(id) ON DELETE CASCADE,
    day_of_week INT NOT NULL, -- 0 for Sunday, 6 for Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES users(id),
    barber_id UUID NOT NULL REFERENCES barber_profiles(id),
    service_id UUID NOT NULL REFERENCES services(id),
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status appointment_status DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for quick lookups
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_barber ON appointments(barber_id);
CREATE INDEX idx_appointments_customer ON appointments(customer_id);
