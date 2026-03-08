
CREATE TABLE users(
id SERIAL PRIMARY KEY,
name TEXT,
phone TEXT,
role TEXT
);

CREATE TABLE drivers(
id SERIAL PRIMARY KEY,
name TEXT,
car TEXT,
plate TEXT,
rating FLOAT DEFAULT 5
);

CREATE TABLE orders(
id SERIAL PRIMARY KEY,
pickup TEXT,
destination TEXT,
price FLOAT,
status TEXT,
created_at TIMESTAMP DEFAULT NOW()
);
