
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors:{origin:"*"} });

app.use(express.json());

app.use("/passenger", express.static(path.join(__dirname,"passenger")));
app.use("/driver", express.static(path.join(__dirname,"driver")));
app.use("/admin", express.static(path.join(__dirname,"admin")));

let drivers = {};
let orders = [];

io.on("connection",(socket)=>{

    socket.on("driver-online",(data)=>{
        drivers[socket.id] = data;
        io.emit("drivers-update",drivers);
    });

    socket.on("driver-location",(data)=>{
        if(drivers[socket.id]){
            drivers[socket.id].lat = data.lat;
            drivers[socket.id].lng = data.lng;
            io.emit("drivers-update",drivers);
        }
    });

    socket.on("create-order",(order)=>{
        order.id = Date.now();
        orders.push(order);
        io.emit("new-order",order);
    });

    socket.on("accept-order",(id)=>{
        io.emit("order-accepted",id);
    });

    socket.on("disconnect",()=>{
        delete drivers[socket.id];
        io.emit("drivers-update",drivers);
    });

});

app.get("/api/orders",(req,res)=>{
    res.json(orders);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log("AzTaxi running on port",PORT);
});
