
CREATE TABLE drivers(
id SERIAL PRIMARY KEY,
name TEXT,
car TEXT,
status TEXT
);

CREATE TABLE rides(
id SERIAL PRIMARY KEY,
pickup TEXT,
dropoff TEXT,
package TEXT,
status TEXT
);
