
const express=require("express")
const http=require("http")
const {Server}=require("socket.io")
const path=require("path")

const app=express()
const server=http.createServer(app)
const io=new Server(server)

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

let drivers={}
let users={}
let trips={}

function dist(a,b){
 const dx=a.lat-b.lat
 const dy=a.lng-b.lng
 return Math.sqrt(dx*dx+dy*dy)
}

function calcPrice(p,d){
 const dkm=dist(p,d)*111
 return Math.round((2+dkm*0.6)*100)/100
}

io.on("connection",(socket)=>{

 socket.on("login",(u)=>{
  users[socket.id]=u
 })

 socket.on("driver-online",(d)=>{
  drivers[socket.id]=d
 })

 socket.on("driver-location",(d)=>{
  drivers[socket.id]=d
  io.emit("drivers",Object.values(drivers))
 })

 socket.on("create-trip",(t)=>{

  t.price=calcPrice(t.pickup,t.destination)

  let best=null
  let min=999999

  Object.entries(drivers).forEach(([id,d])=>{
   const dd=dist(t.pickup,d.location)
   if(dd<min){min=dd;best=id}
  })

  if(best){
   trips[best]=t
   io.to(best).emit("trip-request",t)
  }

 })

 socket.on("trip-accept",(t)=>{
  io.emit("trip-start",t)
 })

 socket.on("trip-end",(t)=>{
  io.emit("trip-finish",t)
 })

 socket.on("disconnect",()=>{
  delete drivers[socket.id]
  delete users[socket.id]
 })

})

server.listen(process.env.PORT||3000)
