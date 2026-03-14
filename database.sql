
CREATE TABLE customers (
id SERIAL PRIMARY KEY,
phone TEXT UNIQUE,
password TEXT,
name TEXT,
surname TEXT,
created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE drivers (
id SERIAL PRIMARY KEY,
phone TEXT UNIQUE,
password TEXT,
name TEXT,
surname TEXT,
car_brand TEXT,
car_model TEXT,
car_number TEXT,
car_color TEXT,
lat DOUBLE PRECISION,
lng DOUBLE PRECISION,
created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
id SERIAL PRIMARY KEY,
customer_id INT,
driver_id INT,
pickup TEXT,
destination TEXT,
pickup_lat DOUBLE PRECISION,
pickup_lng DOUBLE PRECISION,
destination_lat DOUBLE PRECISION,
destination_lng DOUBLE PRECISION,
status TEXT,
created_at TIMESTAMP DEFAULT NOW()
);
