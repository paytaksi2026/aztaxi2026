
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const JWT_SECRET = "aztaxi_secret";

// ---------- SURGE PRICING ----------
function calculatePrice(distance_km, duration_min, demandFactor=1) {
  const minimum_fare = 2.0;
  const base = 0.8;
  const per_km = 0.7;
  const per_min = 0.05;

  let price = minimum_fare + base + (distance_km * per_km) + (duration_min * per_min);
  price = price * demandFactor;

  return Math.round(price * 100) / 100;
}

// ---------- REGISTER ----------
app.post("/api/register", async (req,res)=>{
  const {name, phone, password, role} = req.body;

  const hash = await bcrypt.hash(password,10);

  const result = await pool.query(
    "INSERT INTO users(name,phone,password,role,verified) VALUES($1,$2,$3,$4,true) RETURNING id",
    [name,phone,hash,role]
  );

  res.json({user_id: result.rows[0].id});
});

// ---------- LOGIN ----------
app.post("/api/login", async (req,res)=>{
  const {phone,password} = req.body;

  const result = await pool.query("SELECT * FROM users WHERE phone=$1",[phone]);

  if(result.rows.length === 0) return res.status(401).json({error:"User not found"});

  const user = result.rows[0];

  const ok = await bcrypt.compare(password,user.password);

  if(!ok) return res.status(401).json({error:"Wrong password"});

  const token = jwt.sign({id:user.id, role:user.role}, JWT_SECRET);

  res.json({token,role:user.role});
});

// ---------- PRICE CALCULATE ----------
app.post("/api/ride/calculate", async (req,res)=>{

  const {distance_km,duration_min,activeDrivers,activeRequests} = req.body;

  let demandFactor = 1;

  if(activeDrivers > 0){
    const ratio = activeRequests / activeDrivers;

    if(ratio > 2) demandFactor = 1.5;
    if(ratio > 3) demandFactor = 2;
  }

  const price = calculatePrice(distance_km,duration_min,demandFactor);

  res.json({
    distance_km,
    duration_min,
    surge_multiplier: demandFactor,
    price
  });
});

app.get("/", (req,res)=>{
  res.send("AzTaxi server running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log("Server started on port",PORT);
});
