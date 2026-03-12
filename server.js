const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let drivers = {};
let rides = {};

io.on('connection', (socket) => {
    console.log("Client connected:", socket.id);

    socket.on('driver-online', (data) => {
        drivers[socket.id] = data;
        console.log("Driver online:", data);
    });

    socket.on('request-ride', (ride) => {
        const rideId = Date.now().toString();
        rides[rideId] = ride;
        io.emit('new-ride', { rideId, ride });
    });

    socket.on('accept-ride', ({ rideId }) => {
        io.emit('ride-accepted', { rideId, driver: socket.id });
    });

    socket.on('disconnect', () => {
        delete drivers[socket.id];
    });
});

app.get('/admin', (req,res)=>{
    res.sendFile(path.join(__dirname,'admin','dashboard.html'));
});

server.listen(process.env.PORT || 3000, ()=>{
    console.log("AzTaxi server running");
});