
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors:{origin:"*"} });

const pool = new Pool({
connectionString: process.env.DATABASE_URL
});

let driversOnline = {};

// SOCKET
io.on("connection",(socket)=>{

socket.on("driver-online",(data)=>{
driversOnline[socket.id]=data;
io.emit("drivers",driversOnline);
});

socket.on("disconnect",()=>{
delete driversOnline[socket.id];
io.emit("drivers",driversOnline);
});

});

// PASSENGER REGISTER
app.post("/api/passenger/register", async (req,res)=>{
const {name,email,password}=req.body;
const hash=await bcrypt.hash(password,10);

await pool.query(
"insert into passengers(name,email,password) values($1,$2,$3)",
[name,email,hash]
);

res.json({ok:true});
});

// PASSENGER LOGIN
app.post("/api/passenger/login", async (req,res)=>{
const {email,password}=req.body;

const r=await pool.query(
"select * from passengers where email=$1",
[email]
);

if(!r.rows.length) return res.json({ok:false});

const user=r.rows[0];
const valid=await bcrypt.compare(password,user.password);

res.json({ok:valid,userId:user.id});
});

// DRIVER REGISTER
app.post("/api/driver/register", async (req,res)=>{
const {name,email,password,car}=req.body;
const hash=await bcrypt.hash(password,10);

await pool.query(
"insert into drivers(name,email,password,car) values($1,$2,$3,$4)",
[name,email,hash,car]
);

res.json({ok:true});
});

// DRIVER LOGIN
app.post("/api/driver/login", async (req,res)=>{
const {email,password}=req.body;

const r=await pool.query(
"select * from drivers where email=$1",
[email]
);

if(!r.rows.length) return res.json({ok:false});

const user=r.rows[0];
const valid=await bcrypt.compare(password,user.password);

res.json({ok:valid,driverId:user.id});
});

// CREATE ORDER
app.post("/api/order", async (req,res)=>{
const {passenger_id,lat,lng}=req.body;

const r=await pool.query(
"insert into orders(passenger_id,lat,lng,status) values($1,$2,$3,'pending') returning id",
[passenger_id,lat,lng]
);

res.json({ok:true,orderId:r.rows[0].id});
});

// LIST ORDERS
app.get("/api/orders", async (req,res)=>{
const r=await pool.query("select * from orders order by id desc");
res.json(r.rows);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>console.log("AzTaxi backend running",PORT));
