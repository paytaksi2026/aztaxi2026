
create table users(
 id serial primary key,
 name text,
 phone text,
 password text,
 role text,
 car_model text,
 car_number text,
 lat numeric,
 lng numeric,
 online boolean default false
);

create table orders(
 id serial primary key,
 passenger_id int,
 driver_id int,
 pickup_lat numeric,
 pickup_lng numeric,
 drop_lat numeric,
 drop_lng numeric,
 status text,
 price numeric,
 created_at timestamp default now()
);
