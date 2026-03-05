
-- AzTaxi initial database schema

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 name TEXT,
 phone TEXT,
 password TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drivers (
 id SERIAL PRIMARY KEY,
 name TEXT,
 phone TEXT,
 car_model TEXT,
 car_number TEXT,
 status TEXT,
 rating NUMERIC DEFAULT 5
);

CREATE TABLE rides (
 id SERIAL PRIMARY KEY,
 passenger_id INTEGER,
 driver_id INTEGER,
 pickup_lat NUMERIC,
 pickup_lng NUMERIC,
 dest_lat NUMERIC,
 dest_lng NUMERIC,
 status TEXT,
 price NUMERIC,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
