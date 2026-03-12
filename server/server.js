
const express=require("express");
const http=require("http");
const {Server}=require("socket.io");

const app=express();
const server=http.createServer(app);
const io=new Server(server);

app.use(express.static("public"));
app.use(express.json());

let drivers={};

function dist(a,b){
const dx=a.lat-b.lat;
const dy=a.lng-b.lng;
return Math.sqrt(dx*dx+dy*dy)*111;
}

io.on("connection",socket=>{

socket.on("driver-location",data=>{
drivers[socket.id]=data;
socket.broadcast.emit("driver-update",{id:socket.id,...data});
});

socket.on("ride-request",req=>{

let near=[];

for(let id in drivers){
if(dist(req,drivers[id])<3){
near.push(id);
}
}

near.forEach(id=>{
io.to(id).emit("ride-offer",req);
});

});

});

server.listen(3000,()=>console.log("AzTaxi running"));
