
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors:{origin:"*"}});

app.use(express.json());

app.use("/passenger",express.static(path.join(__dirname,"../passenger")));
app.use("/driver",express.static(path.join(__dirname,"../driver")));
app.use("/admin",express.static(path.join(__dirname,"../admin")));

let drivers = {};
let orders = [];

function distance(a,b){
    const R=6371;
    const dLat=(b.lat-a.lat)*Math.PI/180;
    const dLng=(b.lng-a.lng)*Math.PI/180;
    const sa=Math.sin(dLat/2)**2+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
    return R*2*Math.atan2(Math.sqrt(sa),Math.sqrt(1-sa));
}

io.on("connection",(socket)=>{

 socket.on("driver-online",(data)=>{
    drivers[socket.id]={...data,socket:socket.id};
 });

 socket.on("driver-location",(data)=>{
    if(drivers[socket.id]){
        drivers[socket.id].lat=data.lat;
        drivers[socket.id].lng=data.lng;
    }
 });

 socket.on("create-order",(order)=>{
    order.id=Date.now();
    orders.push(order);

    let best=null;
    let bestDist=999;

    Object.values(drivers).forEach(d=>{
        const dist=distance(order,d);
        if(dist<bestDist){
            bestDist=dist;
            best=d;
        }
    });

    if(best){
        io.to(best.socket).emit("driver-new-order",order);
    }
 });

 socket.on("accept-order",(id)=>{
    io.emit("order-accepted",id);
 });

 socket.on("disconnect",()=>{
    delete drivers[socket.id];
 });

});

app.get("/api/orders",(req,res)=>res.json(orders));
app.get("/api/drivers",(req,res)=>res.json(drivers));

server.listen(3000,()=>console.log("AzTaxi server running"));
