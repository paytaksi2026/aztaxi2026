
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
let orders=[]

io.on("connection",(socket)=>{

socket.on("driver-location",(data)=>{
drivers[socket.id]=data
io.emit("drivers-update",drivers)
})

socket.on("new-order",(order)=>{
orders.push(order)
io.emit("driver-new-order",order)
})

socket.on("driver-accept",(data)=>{
io.emit("order-accepted",data)
})

socket.on("disconnect",()=>{
delete drivers[socket.id]
io.emit("drivers-update",drivers)
})

})

app.get("/api/orders",(req,res)=>{
res.json(orders)
})

const PORT=process.env.PORT||3000
server.listen(PORT,()=>console.log("Server running "+PORT))
