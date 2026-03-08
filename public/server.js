
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const {Pool} = require('pg');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const pool = new Pool({connectionString:process.env.DATABASE_URL});

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

let drivers = {};

function dist(a,b){
 const dx=a.lat-b.lat;
 const dy=a.lng-b.lng;
 return Math.sqrt(dx*dx+dy*dy);
}

function price(pickup,dest){
 const d=dist(pickup,dest);
 return Math.round((d*5000+2)*100)/100;
}

io.on("connection",(socket)=>{

 socket.on("driver-online",(d)=>{
  drivers[socket.id]=d;
 });

 socket.on("driver-location",(d)=>{
  drivers[socket.id]=d;
  io.emit("drivers",Object.values(drivers));
 });

 socket.on("create-order",(o)=>{

  o.price = price(o.pickup,o.destination);

  let best=null;
  let min=999999;

  Object.entries(drivers).forEach(([id,d])=>{
    const dd = dist(o.pickup,d.location);
    if(dd<min){min=dd;best=id;}
  });

  if(best){
    io.to(best).emit("order",o);
  }

 });

 socket.on("accept",(o)=>{
  io.emit("accepted",o);
 });

 socket.on("disconnect",()=>{
  delete drivers[socket.id];
 });

});

app.get("/api/orders",async(req,res)=>{
 const r=await pool.query("SELECT * FROM orders ORDER BY id DESC");
 res.json(r.rows);
});

server.listen(process.env.PORT||3000);
