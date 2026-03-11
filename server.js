
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use("/passenger", express.static(path.join(__dirname,"passenger")));
app.use("/driver", express.static(path.join(__dirname,"driver")));
app.use("/admin", express.static(path.join(__dirname,"admin")));
app.use("/assets", express.static(path.join(__dirname,"assets")));

let drivers = {};
let orders = [];

function distance(a,b){
const R=6371;
const dLat=(b.lat-a.lat)*Math.PI/180;
const dLng=(b.lng-a.lng)*Math.PI/180;
const sa=Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
return R*2*Math.atan2(Math.sqrt(sa),Math.sqrt(1-sa));
}

io.on("connection",(socket)=>{

socket.on("driver-location",(data)=>{
drivers[socket.id]=data;
io.emit("drivers",drivers);
});

socket.on("create-order",(pickup)=>{

let best=null;
let bestDist=999;

Object.values(drivers).forEach(d=>{
const dist=distance(pickup,d);
if(dist<bestDist){
bestDist=dist;
best=d;
}
});

orders.push({pickup});

if(best){
io.emit("dispatch",{pickup,driver:best});
}

});

socket.on("disconnect",()=>{
delete drivers[socket.id];
io.emit("drivers",drivers);
});

});

app.get("/api/drivers",(req,res)=>res.json(drivers));
app.get("/api/orders",(req,res)=>res.json(orders));

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>console.log("AzTaxi running on",PORT));
