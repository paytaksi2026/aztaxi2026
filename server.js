
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","login.html"));
});

app.post("/api/register_customer", async(req,res)=>{
  const {phone,password,name,surname} = req.body;

  const check = await pool.query("SELECT id FROM customers WHERE phone=$1",[phone]);

  if(check.rows.length>0){
    return res.json({error:"customer_phone_exists"});
  }

  await pool.query(
    "INSERT INTO customers(phone,password,name,surname) VALUES($1,$2,$3,$4)",
    [phone,password,name,surname]
  );

  res.json({success:true});
});

app.post("/api/register_driver", async(req,res)=>{

  const {phone,password,name,surname,car_brand,car_model,car_number,car_color} = req.body;

  const check = await pool.query("SELECT id FROM drivers WHERE phone=$1",[phone]);

  if(check.rows.length>0){
    return res.json({error:"driver_phone_exists"});
  }

  await pool.query(
    "INSERT INTO drivers(phone,password,name,surname,car_brand,car_model,car_number,car_color) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
    [phone,password,name,surname,car_brand,car_model,car_number,car_color]
  );

  res.json({success:true});

});

app.get("/api/drivers", async(req,res)=>{

  const drivers = await pool.query("SELECT id,name,lat,lng FROM drivers WHERE lat IS NOT NULL");

  res.json(drivers.rows);

});

io.on("connection",(socket)=>{

  socket.on("driver_location", async(data)=>{

    const {driver_id,lat,lng} = data;

    await pool.query(
      "UPDATE drivers SET lat=$1,lng=$2 WHERE id=$3",
      [lat,lng,driver_id]
    );

    io.emit("driver_update",{driver_id,lat,lng});

  });

});

server.listen(process.env.PORT || 3000,()=>{
  console.log("Taxi server started");
});
