
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: { rejectUnauthorized:false }
});

app.get("/api/drivers", async(req,res)=>{
 const r = await pool.query("select id,lat,lng from users where role='driver' and online=true");
 res.json(r.rows);
});

app.get("/api/orders", async(req,res)=>{
 const r = await pool.query("select * from orders order by id desc limit 100");
 res.json(r.rows);
});

app.post("/api/order", async(req,res)=>{

 const {pickup_lat,pickup_lng,drop_lat,drop_lng,passenger_id} = req.body;

 const q=`insert into orders(passenger_id,pickup_lat,pickup_lng,drop_lat,drop_lng,status)
 values($1,$2,$3,$4,$5,'searching') returning *`;

 const r = await pool.query(q,[passenger_id,pickup_lat,pickup_lng,drop_lat,drop_lng]);

 io.emit("newOrder",r.rows[0]);

 res.json(r.rows[0]);
});

app.post("/api/price",(req,res)=>{

 const {km}=req.body;
 const price = 2 + km*0.6;

 res.json({price});

});

io.on("connection",(socket)=>{

 socket.on("driverLocation", async data=>{

  const {driver_id,lat,lng}=data;

  await pool.query(
   "update users set lat=$1,lng=$2,online=true where id=$3",
   [lat,lng,driver_id]
  );

  io.emit("driverMove",{driver_id,lat,lng});

 });

});

server.listen(process.env.PORT || 3000, ()=>{
 console.log("AzTaxi server running");
});
