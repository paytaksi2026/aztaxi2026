
CREATE TABLE users(
 id SERIAL PRIMARY KEY,
 name TEXT,
 phone VARCHAR(20),
 password TEXT,
 role TEXT,
 status TEXT DEFAULT 'active',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX unique_passenger_phone
ON users(phone) WHERE role='passenger';

CREATE UNIQUE INDEX unique_driver_phone
ON users(phone) WHERE role='driver';

CREATE TABLE drivers(
 id SERIAL PRIMARY KEY,
 user_id INT REFERENCES users(id),
 car_model TEXT,
 car_number TEXT,
 rating NUMERIC DEFAULT 5
);

CREATE TABLE driver_wallet(
 id SERIAL PRIMARY KEY,
 driver_id INT REFERENCES drivers(id),
 balance NUMERIC DEFAULT 0
);

CREATE TABLE tariffs(
 id SERIAL PRIMARY KEY,
 name TEXT,
 base_price NUMERIC,
 base_km NUMERIC,
 price_per_km NUMERIC,
 commission_percent NUMERIC
);

INSERT INTO tariffs(name,base_price,base_km,price_per_km,commission_percent)
VALUES
('Ekonom',3.5,3,0.35,10),
('Komfort',4.5,3,0.45,10),
('Premium',6,3,0.60,10);

CREATE TABLE rides(
 id SERIAL PRIMARY KEY,
 passenger_id INT,
 driver_id INT,
 tariff_id INT,
 distance_km NUMERIC,
 price NUMERIC,
 commission NUMERIC,
 status TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ride_messages(
 id SERIAL PRIMARY KEY,
 ride_id INT,
 sender TEXT,
 message TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
