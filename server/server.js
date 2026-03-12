
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
let balances={};

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

   let bestDriver=null;
   let bestDistance=999;

   for(let id in drivers){
     let d=distance(ride,drivers[id]);
     if(d<bestDistance){
       bestDistance=d;
       bestDriver=id;
     }
   }

   if(bestDriver){
     rides[bestDriver]=ride;
     io.to(bestDriver).emit("ride-offer",ride);
   }

 });

 socket.on("ride-accept",ride=>{
   io.emit("ride-started",ride);
 });

 socket.on("ride-finish",data=>{

   let driver=data.driver;

   if(!balances[driver]) balances[driver]=0;

   balances[driver]+=data.price || 5;

   io.emit("ride-finished",data);

 });

});

server.listen(process.env.PORT||3000,()=>{
 console.log("AzTaxi V11 running");
});
