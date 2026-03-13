
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  phone TEXT UNIQUE,
  password TEXT,
  role TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  car_model TEXT,
  car_number TEXT,
  online BOOLEAN DEFAULT false,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  rating DOUBLE PRECISION DEFAULT 5,
  balance DOUBLE PRECISION DEFAULT 0,
  acceptance_rate DOUBLE PRECISION DEFAULT 1,
  cancel_rate DOUBLE PRECISION DEFAULT 0
);

CREATE TABLE rides (
  id SERIAL PRIMARY KEY,
  passenger_id INTEGER REFERENCES users(id),
  driver_id INTEGER REFERENCES users(id),
  pickup_address TEXT,
  pickup_lat DOUBLE PRECISION,
  pickup_lng DOUBLE PRECISION,
  drop_address TEXT,
  drop_lat DOUBLE PRECISION,
  drop_lng DOUBLE PRECISION,
  distance DOUBLE PRECISION,
  duration DOUBLE PRECISION,
  price DOUBLE PRECISION,
  status TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
