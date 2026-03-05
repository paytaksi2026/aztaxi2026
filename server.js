
// AzTaxi Minimal Backend Server
// Node.js + Express + Socket.io

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.static(__dirname));
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(cors());
app.use(bodyParser.json());

// In‑memory demo storage (replace with PostgreSQL later)
let drivers = {};
let rides = {};

app.get("/", (req, res) => {
    res.json({ status: "AzTaxi API running" });
});

// Driver location update
app.post("/driver/location", (req, res) => {
    const { driverId, lat, lng } = req.body;
    drivers[driverId] = { lat, lng };
    io.emit("drivers:update", drivers);
    res.json({ ok: true });
});

// Passenger ride request
app.post("/ride/request", (req, res) => {
    const { passengerId, pickupLat, pickupLng } = req.body;
    const rideId = "ride_" + Date.now();

    rides[rideId] = {
        passengerId,
        pickupLat,
        pickupLng,
        status: "waiting"
    };

    io.emit("ride:new", { rideId, pickupLat, pickupLng });
    res.json({ rideId });
});

io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("ride:accept", (data) => {
        const { rideId, driverId } = data;
        if (rides[rideId]) {
            rides[rideId].driverId = driverId;
            rides[rideId].status = "accepted";
            io.emit("ride:accepted", rides[rideId]);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("AzTaxi server running on port " + PORT);
});
