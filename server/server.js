
const express=require("express");
const http=require("http");
const {Server}=require("socket.io");

const app=express();
const server=http.createServer(app);
const io=new Server(server);

app.use(express.static("public"));
app.use(express.json());

let drivers={};
let passengers={};

function distance(a,b){
const dx=a.lat-b.lat;
const dy=a.lng-b.lng;
return Math.sqrt(dx*dx+dy*dy)*111;
}

io.on("connection",(socket)=>{

socket.on("driver-location",(data)=>{
drivers[socket.id]=data;
socket.broadcast.emit("driver-update",{id:socket.id,...data});
});

socket.on("passenger-request",(req)=>{

let nearby=[];

for(let id in drivers){
let d=distance(req,drivers[id]);
if(d<3){
nearby.push(id);
}
}

nearby.forEach(id=>{
io.to(id).emit("ride-request",req);
});

});

});

server.listen(3000,()=>console.log("AzTaxi server running"));
