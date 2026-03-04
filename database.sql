CREATE TABLE IF NOT EXISTS passengers (
  id SERIAL PRIMARY KEY,
  name TEXT,
  phone TEXT UNIQUE,
  password TEXT,
  rating NUMERIC DEFAULT 5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  name TEXT,
  phone TEXT UNIQUE,
  password TEXT,
  car_model TEXT,
  car_color TEXT,
  car_year INT,
  plate TEXT,
  status TEXT DEFAULT 'pending',
  rating NUMERIC DEFAULT 5,
  balance NUMERIC DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rides (
  id SERIAL PRIMARY KEY,
  passenger_id INT,
  driver_id INT,
  from_address TEXT,
  to_address TEXT,
  distance_km NUMERIC,
  price NUMERIC,
  status TEXT DEFAULT 'requested',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);