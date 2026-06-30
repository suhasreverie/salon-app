-- Clean up existing data first
TRUNCATE TABLE appointments, services, barber_profiles, users CASCADE;

-- Insert mock customer
INSERT INTO users (id, name, email, phone, role) 
VALUES ('00000000-0000-0000-0000-000000000000', 'John Doe', 'john@example.com', '+1234567890', 'CUSTOMER');

-- Insert mock barber users
INSERT INTO users (id, name, email, phone, role) VALUES 
('11111111-1111-1111-1111-111111111110', 'Langu Maseko', 'langu@example.com', '+27111111110', 'BARBER'),
('11111111-1111-1111-1111-111111111111', 'David Ross', 'david@example.com', '+27111111111', 'BARBER'),
('11111111-1111-1111-1111-111111111112', 'Amir Novak', 'amir@example.com', '+27111111112', 'BARBER'),
('11111111-1111-1111-1111-111111111113', 'Leo Hayes', 'leo@example.com', '+27111111113', 'BARBER');

-- Insert mock barber profiles linked to those users
INSERT INTO barber_profiles (id, user_id, experience_years, rating, is_active) VALUES 
('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111110', 8, 4.9, true),
('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 9, 4.8, true),
('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111112', 6, 4.7, true),
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111113', 11, 4.9, true);

-- Insert services
INSERT INTO services (id, name, description, duration_minutes, price, is_active) VALUES 
('22222222-2222-2222-2222-222222222221', 'Executive Cut', 'Premium haircut tailored to you.', 45, 40.00, true),
('22222222-2222-2222-2222-222222222222', 'Beard Ritual', 'Detailed trim, shape, and hot towel finish.', 30, 25.00, true),
('22222222-2222-2222-2222-222222222223', 'Executive Cut + Beard', 'The full package. Haircut and premium beard trim.', 75, 60.00, true),
('22222222-2222-2222-2222-222222222224', 'Classic Taper', 'Clean taper fade.', 30, 30.00, true),
('22222222-2222-2222-2222-222222222225', 'Hot Towel Shave', 'Traditional straight razor shave.', 45, 35.00, true);
