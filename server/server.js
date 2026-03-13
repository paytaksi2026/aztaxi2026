
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
let messages={};

function distance(a,b){
 const dx=a.lat-b.lat;
 const dy=a.lng-b.lng;
 return Math.sqrt(dx*dx+dy*dy)*111;
}

io.on("connection",socket=>{

 socket.on("driver-location",data=>{
   drivers[socket.id]=data;
   io.emit("driver-update",{id:socket.id,...data});
 });

 socket.on("ride-request",ride=>{

   let best=null;
   let bestDist=999;

   for(let id in drivers){
     let d=distance(ride,drivers[id]);
     if(d<bestDist){
       bestDist=d;
       best=id;
     }
   }

   if(best){
     rides[best]=ride;
     io.to(best).emit("ride-offer",ride);
   }

 });

 socket.on("chat-message",msg=>{
   io.emit("chat-message",msg);
 });

 socket.on("ride-finish",ride=>{
   io.emit("ride-finished",ride);
 });

});

server.listen(process.env.PORT||3000,()=>{
 console.log("AzTaxi V12 running");
});
