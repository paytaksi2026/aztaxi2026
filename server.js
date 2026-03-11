
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use("/passenger",express.static(path.join(__dirname,"passenger")));
app.use("/driver",express.static(path.join(__dirname,"driver")));
app.use("/admin",express.static(path.join(__dirname,"admin")));
app.use("/assets",express.static(path.join(__dirname,"assets")));

let drivers = {};
let orders = [];

io.on("connection",(socket)=>{

socket.on("driver-location",(data)=>{
drivers[socket.id]=data;
io.emit("drivers",drivers);
});

socket.on("create-order",(data)=>{
data.id=Date.now();
orders.push(data);
io.emit("new-order",data);
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

const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>console.log("AzTaxi running",PORT));
