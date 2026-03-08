
CREATE TABLE users(
id SERIAL PRIMARY KEY,
name TEXT,
phone TEXT,
password TEXT
);

CREATE TABLE drivers(
id SERIAL PRIMARY KEY,
name TEXT,
car TEXT,
plate TEXT,
balance FLOAT DEFAULT 0
);

CREATE TABLE trips(
id SERIAL PRIMARY KEY,
pickup JSON,
destination JSON,
price FLOAT,
status TEXT,
created_at TIMESTAMP DEFAULT NOW()
);
