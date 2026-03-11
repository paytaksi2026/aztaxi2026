
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

const pool = new Pool({
 connectionString: process.env.DATABASE_URL
});

// store live drivers
let drivers = {};

// SOCKET
io.on("connection",(socket)=>{

 socket.on("driver-online",(data)=>{
  drivers[socket.id]={
   lat:data.lat,
   lng:data.lng,
   driver_id:data.driver_id
  };
  io.emit("drivers",drivers);
 });

 socket.on("disconnect",()=>{
  delete drivers[socket.id];
  io.emit("drivers",drivers);
 });

});

// helper: nearest driver
function nearestDriver(lat,lng){
 let best=null;
 let bestDist=999999;

 for(const id in drivers){
  const d=drivers[id];
  const dist=Math.sqrt(
   Math.pow(lat-d.lat,2)+Math.pow(lng-d.lng,2)
  );
  if(dist<bestDist){
   bestDist=dist;
   best=d;
  }
 }
 return best;
}

// create order
app.post("/api/order", async (req,res)=>{
 const { passenger_id, lat, lng } = req.body;

 const r = await pool.query(
  "insert into orders(passenger_id,lat,lng,status) values($1,$2,$3,'pending') returning id",
  [passenger_id,lat,lng]
 );

 const orderId=r.rows[0].id;

 const driver=nearestDriver(lat,lng);

 if(driver){
  io.emit("dispatch",{
   order_id:orderId,
   driver_id:driver.driver_id
  });
 }

 res.json({ok:true,orderId});
});

// list drivers for admin map
app.get("/api/drivers-live",(req,res)=>{
 res.json(drivers);
});

// list orders
app.get("/api/orders", async (req,res)=>{
 const r = await pool.query("select * from orders order by id desc");
 res.json(r.rows);
});

const PORT=process.env.PORT||3000;
server.listen(PORT,()=>console.log("AzTaxi V2 running",PORT));
