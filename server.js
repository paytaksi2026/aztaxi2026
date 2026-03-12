
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let drivers = {};
let rides = {};

io.on("connection",(socket)=>{

    socket.on("driver-online",(data)=>{
        drivers[socket.id] = data;
    });

    socket.on("ride-request",(data)=>{
        const rideId = Date.now().toString();
        rides[rideId] = data;
        io.emit("new-ride",{rideId,data});
    });

    socket.on("ride-accept",(rideId)=>{
        io.emit("ride-accepted",{rideId,driver:socket.id});
    });

    socket.on("disconnect",()=>{
        delete drivers[socket.id];
    });

});

app.get("/driver",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","driver.html"));
});

app.get("/passenger",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","passenger_map.html"));
});

app.get("/admin",(req,res)=>{
    res.sendFile(path.join(__dirname,"admin","dashboard.html"));
});

server.listen(process.env.PORT || 3000,()=>{
    console.log("AzTaxi running");
});
