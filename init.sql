CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('passenger','driver','admin')) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 5.0,
    total_rides INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driver_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    car_brand VARCHAR(50),
    car_model VARCHAR(50),
    car_color VARCHAR(30),
    car_plate VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE
);
