-- Insert mock customer
INSERT INTO users (id, name, email, phone, role) 
VALUES ('00000000-0000-0000-0000-000000000000', 'John Doe', 'john@example.com', '+1234567890', 'CUSTOMER');

-- Insert mock barber user
INSERT INTO users (id, name, email, phone, role) 
VALUES ('11111111-1111-1111-1111-111111111111', 'David The Barber', 'david@example.com', '+1987654321', 'BARBER');

-- Insert mock barber profile linked to that user
INSERT INTO barber_profiles (id, user_id, experience_years, rating, is_active)
VALUES ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 8, 4.9, true);

-- Insert services
INSERT INTO services (id, name, description, duration_minutes, price, is_active)
VALUES 
    ('22222222-2222-2222-2222-222222222221', 'Haircut', 'Classic or modern haircut tailored to you.', 45, 40.00, true),
    ('22222222-2222-2222-2222-222222222222', 'Beard Trim', 'Detailed trim, shape, and hot towel finish.', 30, 25.00, true),
    ('22222222-2222-2222-2222-222222222223', 'Haircut + Beard', 'The full package. Haircut and premium beard trim.', 75, 60.00, true);
