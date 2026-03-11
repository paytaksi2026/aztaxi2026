
const express=require("express");
const {Pool}=require("pg");
const app=express();

app.use(express.json());

const pool=new Pool({
connectionString:process.env.DATABASE_URL
});

app.post("/api/passenger/register",async(req,res)=>{
const {name,email,password}=req.body;
await pool.query(
"insert into passengers(name,email,password) values($1,$2,$3)",
[name,email,password]
);
res.json({ok:true});
});

app.post("/api/passenger/login",async(req,res)=>{
const {email,password}=req.body;
const r=await pool.query(
"select * from passengers where email=$1 and password=$2",
[email,password]
);
res.json({ok:r.rows.length>0});
});

app.post("/api/driver/register",async(req,res)=>{
const {name,email,password,car}=req.body;
await pool.query(
"insert into drivers(name,email,password,car) values($1,$2,$3,$4)",
[name,email,password,car]
);
res.json({ok:true});
});

app.post("/api/driver/login",async(req,res)=>{
const {email,password}=req.body;
const r=await pool.query(
"select * from drivers where email=$1 and password=$2",
[email,password]
);
res.json({ok:r.rows.length>0});
});

app.listen(3000,()=>console.log("Auth server running"));
