
const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let rides = [];
let earnings = 0;

app.post("/api/register",(req,res)=>{
users.push(req.body);
res.json({ok:true});
});

app.post("/api/login",(req,res)=>{
const u = users.find(x=>x.phone==req.body.phone && x.password==req.body.password);
if(!u) return res.json({ok:false});
res.json({ok:true,user:u});
});

app.post("/api/ride-finish",(req,res)=>{
rides.push(req.body);
earnings += req.body.price * 0.1;
res.json({ok:true});
});

app.get("/api/rides",(req,res)=>res.json(rides));

app.get("/api/earnings",(req,res)=>res.json({earnings}));

app.listen(3000,()=>console.log("AzTaxi module running"));
