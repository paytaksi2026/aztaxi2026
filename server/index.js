
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{cors:{origin:"*"}});

// DATABASE
const pool = new Pool({
 connectionString: process.env.DATABASE_URL
});

// AUTH
app.use("/api", require("./server_auth"));

// SIMPLE ORDERS DEMO
app.post("/api/order", async (req,res)=>{
 const { passenger_id, lat, lng } = req.body;

 const r = await pool.query(
  "insert into orders(passenger_id,lat,lng,status) values($1,$2,$3,'pending') returning id",
  [passenger_id,lat,lng]
 );

 res.json({ok:true,orderId:r.rows[0].id});
});

app.get("/api/orders", async (req,res)=>{
 const r = await pool.query("select * from orders order by id desc");
 res.json(r.rows);
});

// SOCKET DRIVER ONLINE
let drivers = {};

io.on("connection",(socket)=>{

 socket.on("driver-online",(data)=>{
  drivers[socket.id]=data;
  io.emit("drivers",drivers);
 });

 socket.on("disconnect",()=>{
  delete drivers[socket.id];
  io.emit("drivers",drivers);
 });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>console.log("AzTaxi running",PORT));
