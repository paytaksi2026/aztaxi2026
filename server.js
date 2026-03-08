
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let drivers = {};

io.on("connection", (socket) => {

  socket.on("driver-online", (data) => {
    drivers[socket.id] = data;
  });

  socket.on("driver-location", (data) => {
    drivers[socket.id] = data;
    io.emit("drivers-update", Object.values(drivers));
  });

  socket.on("create-order", (order) => {
    io.emit("new-order", order);
  });

  socket.on("accept-order", (order) => {
    io.emit("order-accepted", order);
  });

  socket.on("disconnect", () => {
    delete drivers[socket.id];
  });

});

app.get("/api/orders", async (req,res)=>{
  const r = await pool.query("SELECT * FROM orders ORDER BY id DESC");
  res.json(r.rows);
});

app.post("/api/orders", async (req,res)=>{
  const {pickup,destination,price} = req.body;
  const r = await pool.query(
    "INSERT INTO orders(pickup,destination,price,status) VALUES($1,$2,$3,'new') RETURNING *",
    [pickup,destination,price]
  );
  res.json(r.rows[0]);
});

server.listen(process.env.PORT || 3000, ()=>{
  console.log("AzTaxi server running");
});
