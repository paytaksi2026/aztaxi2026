
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.use("/passenger", express.static(path.join(__dirname,"passenger")));
app.use("/driver", express.static(path.join(__dirname,"driver")));
app.use("/admin", express.static(path.join(__dirname,"admin")));
app.use("/assets", express.static(path.join(__dirname,"assets")));

let drivers = {};
let users = {};
let orders = [];
let wallets = {};
let withdraws = [];

function distance(a,b){
const R=6371;
const dLat=(b.lat-a.lat)*Math.PI/180;
const dLng=(b.lng-a.lng)*Math.PI/180;
const sa=Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
return R*2*Math.atan2(Math.sqrt(sa),Math.sqrt(1-sa));
}

function surgeMultiplier(){
const d = Object.keys(drivers).length;
const o = orders.length;
if(o>d*2) return 2;
if(o>d) return 1.5;
if(o>0) return 1.2;
return 1;
}

function price(distanceKm,timeMin){
const base=1.5;
const km=0.6*distanceKm;
const min=0.1*timeMin;
const surge=surgeMultiplier();
return (base+km+min)*surge;
}

io.on("connection",(socket)=>{

socket.on("driver-location",(data)=>{
drivers[socket.id]=data;
io.emit("drivers",drivers);
});

socket.on("create-order",(pickup)=>{

let best=null;
let bestDist=999;

Object.entries(drivers).forEach(([id,d])=>{
const dist=distance(pickup,d);
if(dist<bestDist){
bestDist=dist;
best=id;
}
});

const order={id:Date.now(),pickup,driver:best};
orders.push(order);

if(best){
io.to(best).emit("ride-request",order);
}

});

socket.on("ride-finished",(data)=>{

const earn=data.price*0.9;
wallets[data.driver]=(wallets[data.driver]||0)+earn;

});

socket.on("disconnect",()=>{
delete drivers[socket.id];
io.emit("drivers",drivers);
});

});

app.post("/api/register-driver",(req,res)=>{
const id=Date.now().toString();
users[id]={...req.body,status:"PENDING"};
wallets[id]=0;
res.json({ok:true});
});

app.get("/api/drivers",(req,res)=>res.json(drivers));
app.get("/api/orders",(req,res)=>res.json(orders));
app.get("/api/wallet/:id",(req,res)=>res.json({balance:wallets[req.params.id]||0}));

app.post("/api/withdraw",(req,res)=>{
withdraws.push(req.body);
res.json({ok:true});
});

app.get("/api/withdraws",(req,res)=>res.json(withdraws));

app.get("/api/route", async (req,res)=>{
const {a,b} = req.query;
const url=`https://router.project-osrm.org/route/v1/driving/${a};${b}?overview=full`;
const r = await fetch(url);
const j = await r.json();
res.json(j);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>console.log("AzTaxi PRO running on",PORT));
