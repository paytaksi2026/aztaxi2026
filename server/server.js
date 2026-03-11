
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use("/passenger", express.static(__dirname + "/../passenger"));
app.use("/driver", express.static(__dirname + "/../driver"));
app.use("/assets", express.static(__dirname + "/../assets"));

io.on("connection", socket => {

socket.on("join", room => {
socket.join(room);
});

socket.on("chat-message", data => {
io.to(data.room).emit("chat-message", data);
});

});

server.listen(3000, () => console.log("Chat system running"));
