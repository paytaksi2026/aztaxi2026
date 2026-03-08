
const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const path = require("path")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

let users = []
let drivers = []
let ratings = []

app.post("/api/register",(req,res)=>{

 const user = {
  id:Date.now(),
  name:req.body.name,
  phone:req.body.phone,
  password:req.body.password,
  role:req.body.role
 }

 users.push(user)

 res.json({status:"ok",user})

})

app.post("/api/login",(req,res)=>{

 const user = users.find(
  u=>u.phone===req.body.phone && u.password===req.body.password
 )

 if(!user){
  return res.status(401).json({error:"login failed"})
 }

 res.json(user)

})

app.post("/api/driver",(req,res)=>{

 const driver={
  id:Date.now(),
  userId:req.body.userId,
  carModel:req.body.carModel,
  plate:req.body.plate,
  carColor:req.body.carColor
 }

 drivers.push(driver)

 res.json(driver)

})

app.post("/api/rate",(req,res)=>{

 const r={
  id:Date.now(),
  driverId:req.body.driverId,
  stars:req.body.stars
 }

 ratings.push(r)

 res.json(r)

})

app.get("/api/rating/:driverId",(req,res)=>{

 const driverRatings=ratings.filter(r=>r.driverId==req.params.driverId)

 if(driverRatings.length===0){
  return res.json({rating:5})
 }

 const avg=driverRatings.reduce((a,b)=>a+b.stars,0)/driverRatings.length

 res.json({rating:avg})

})

server.listen(process.env.PORT || 3000)
