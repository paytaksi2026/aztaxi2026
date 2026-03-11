
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Passenger register
app.post("/api/passenger/register", async (req,res)=>{
 const {name,email,password}=req.body;
 const hash = await bcrypt.hash(password,10);

 await pool.query(
  "insert into passengers(name,email,password) values($1,$2,$3)",
  [name,email,hash]
 );

 res.json({ok:true});
});

// Passenger login
app.post("/api/passenger/login", async (req,res)=>{
 const {email,password}=req.body;

 const r = await pool.query(
  "select * from passengers where email=$1",
  [email]
 );

 if(!r.rows.length) return res.json({ok:false});

 const user=r.rows[0];
 const valid = await bcrypt.compare(password,user.password);

 res.json({ok:valid,userId:user.id});
});

// Driver register
app.post("/api/driver/register", async (req,res)=>{
 const {name,email,password,car}=req.body;
 const hash = await bcrypt.hash(password,10);

 await pool.query(
  "insert into drivers(name,email,password,car) values($1,$2,$3,$4)",
  [name,email,hash,car]
 );

 res.json({ok:true});
});

// Driver login
app.post("/api/driver/login", async (req,res)=>{
 const {email,password}=req.body;

 const r = await pool.query(
  "select * from drivers where email=$1",
  [email]
 );

 if(!r.rows.length) return res.json({ok:false});

 const user=r.rows[0];
 const valid = await bcrypt.compare(password,user.password);

 res.json({ok:valid,driverId:user.id});
});

app.listen(process.env.PORT||3000,()=>console.log("AzTaxi auth running"));
