
const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.json());

// static folders
app.use("/passenger", express.static(path.join(__dirname, "passenger")));
app.use("/driver", express.static(path.join(__dirname, "driver")));
app.use("/admin", express.static(path.join(__dirname, "admin")));
app.use("/android", express.static(path.join(__dirname, "android")));

// auto load all server modules
const files = fs.readdirSync(__dirname);

files.forEach(file => {
  if (file.startsWith("server-") && file.endsWith(".js")) {
    try {
      const mod = require("./" + file);
      if (typeof mod === "function") {
        mod(app, io);
        console.log("Loaded module:", file);
      } else {
        console.log("Module loaded:", file);
      }
    } catch (err) {
      console.log("Module error:", file, err.message);
    }
  }
});

// socket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// health check
app.get("/api/health", (req,res)=>{
  res.json({status:"AzTaxi running"});
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
  console.log("AzTaxi server running on port", PORT);
});
