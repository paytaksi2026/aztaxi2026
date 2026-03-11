const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

app.use("/driver", express.static(path.join(__dirname, "driver")));
app.use("/passenger", express.static(path.join(__dirname, "passenger")));

let drivers = [];

io.on("connection", (socket) => {

  socket.on("driver-location", (data) => {

    let driver = drivers.find(d => d.id === data.id);

    if (!driver) {
      drivers.push(data);
    } else {
      driver.lat = data.lat;
      driver.lng = data.lng;
    }

    io.emit("drivers-update", drivers);

  });

});

app.get("/", (req,res)=>{
  res.send("AzTaxi server işləyir");
});

server.listen(PORT, ()=>{
  console.log("AzTaxi server running");
});
