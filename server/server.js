
const express=require("express");
const http=require("http");
const {Server}=require("socket.io");

const app=express();
const server=http.createServer(app);
const io=new Server(server);

app.use(express.static("public"));
app.use(express.json());

let drivers={};

function distance(a,b){
 const R=6371;
 const dLat=(b.lat-a.lat)*Math.PI/180;
 const dLng=(b.lng-a.lng)*Math.PI/180;

 const aa=Math.sin(dLat/2)*Math.sin(dLat/2)+
 Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*
 Math.sin(dLng/2)*Math.sin(dLng/2);

 const c=2*Math.atan2(Math.sqrt(aa),Math.sqrt(1-aa));
 return R*c;
}

io.on("connection",socket=>{

 socket.on("driver-location",data=>{
   drivers[socket.id]=data;
   io.emit("drivers",drivers);
 });

 socket.on("ride-request",ride=>{

   let best=null;
   let bestDist=999;

   for(let id in drivers){
     let d=distance(ride,drivers[id]);
     if(d<bestDist){
       best=id;
       bestDist=d;
     }
   }

   if(best){
     io.to(best).emit("ride-offer",ride);
   }

 });

});

server.listen(process.env.PORT||3000,()=>{
 console.log("AzTaxi server running");
});
