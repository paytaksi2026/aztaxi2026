
const express=require("express");
const http=require("http");
const {Server}=require("socket.io");

const app=express();
const server=http.createServer(app);
const io=new Server(server);

app.use(express.static("public"));
app.use(express.json());

let drivers={};
let rides={};

function dist(a,b){
 const dx=a.lat-b.lat;
 const dy=a.lng-b.lng;
 return Math.sqrt(dx*dx+dy*dy)*111;
}

io.on("connection",(socket)=>{

 socket.on("driver-location",(data)=>{
  drivers[socket.id]=data;
  io.emit("driver-update",{id:socket.id,...data});
 });

 socket.on("ride-request",(ride)=>{

  rides[socket.id]=ride;

  let near=[];

  for(let id in drivers){
   if(dist(ride,drivers[id])<3){
    near.push(id);
   }
  }

  near.forEach(id=>{
   io.to(id).emit("ride-offer",ride);
  });

 });

 socket.on("ride-accept",(ride)=>{
  io.emit("ride-accepted",ride);
 });

 socket.on("ride-finished",(data)=>{
  io.emit("ride-finished",data);
 });

});

server.listen(process.env.PORT||3000,()=>{
 console.log("AzTaxi PRO V3 running");
});
