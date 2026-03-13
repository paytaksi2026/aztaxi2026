
const express=require("express");
const http=require("http");
const {Server}=require("socket.io");
const {Pool}=require("pg");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const app=express();
const server=http.createServer(app);
const io=new Server(server);

app.use(express.json());
app.use(express.static("public"));

const pool=new Pool({connectionString:process.env.DATABASE_URL});
const JWT_SECRET="aztaxi_secret";

let driversOnline={};

function distance(a,b){
 const dx=a.lat-b.lat;
 const dy=a.lng-b.lng;
 return Math.sqrt(dx*dx+dy*dy)*111;
}

app.post("/api/register",async(req,res)=>{
 const {name,phone,password,role}=req.body;

 const check=await pool.query(
 "SELECT id FROM users WHERE phone=$1 AND role=$2",
 [phone,role]
 );

 if(check.rows.length>0){
  return res.json({error:"Bu nömrə bazada qeydiyyatdadır"});
 }

 const hash=await bcrypt.hash(password,10);

 let status="active";
 if(role==="driver") status="pending";

 const user=await pool.query(
 "INSERT INTO users(name,phone,password,role,status) VALUES($1,$2,$3,$4,$5) RETURNING id",
 [name,phone,hash,role,status]
 );

 if(role==="driver"){
  await pool.query(
   "INSERT INTO drivers(user_id,rating) VALUES($1,5)",
   [user.rows[0].id]
  );
 }

 res.json({success:true,status});
});

app.post("/api/login",async(req,res)=>{
 const {phone,password,role}=req.body;

 const user=await pool.query(
 "SELECT * FROM users WHERE phone=$1 AND role=$2",
 [phone,role]
 );

 if(user.rows.length===0) return res.json({error:"İstifadəçi tapılmadı"});

 const u=user.rows[0];
 const ok=await bcrypt.compare(password,u.password);
 if(!ok) return res.json({error:"Şifrə səhvdir"});

 if(role==="driver" && u.status!=="active"){
  return res.json({error:"Admin təsdiqi gözlənilir"});
 }

 const token=jwt.sign({id:u.id},JWT_SECRET);
 res.json({token});
});

io.on("connection",socket=>{

 socket.on("driver-location",data=>{
  driversOnline[socket.id]=data;
  io.emit("driver-update",{id:socket.id,...data});
 });

 socket.on("ride-request",ride=>{
  let best=null;
  let bestDist=999;

  for(let id in driversOnline){
   let d=distance(ride,driversOnline[id]);
   if(d<bestDist){
    bestDist=d;
    best=id;
   }
  }

  if(best){
   io.to(best).emit("ride-offer",ride);
  }
 });

 socket.on("chat-message",msg=>{
  io.emit("chat-message",msg);
 });

});

server.listen(process.env.PORT||3000,()=>{
 console.log("AzTaxi running");
});
