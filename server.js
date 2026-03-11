const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const path = require("path")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000

app.use(express.json())

// static folders
app.use("/passenger", express.static(path.join(__dirname,"passenger")))
app.use("/driver", express.static(path.join(__dirname,"driver")))
app.use("/admin", express.static(path.join(__dirname,"admin")))

let drivers = []
let orders = []

io.on("connection",(socket)=>{

console.log("client connected")

// DRIVER LOCATION
socket.on("driver-location",(data)=>{

let driver = drivers.find(d=>d.id===data.id)

if(!driver){

drivers.push(data)

}else{

driver.lat = data.lat
driver.lng = data.lng

}

io.emit("drivers-update",drivers)

})

// PASSENGER ORDER
socket.on("create-order",(order)=>{

orders.push(order)

io.emit("new-order",order)

})

// DRIVER ACCEPT
socket.on("accept-order",(data)=>{

io.emit("order-accepted",data)

})

})

app.get("/",(req,res)=>{
res.send("AzTaxi server işləyir")
})

server.listen(PORT,()=>{
console.log("AzTaxi realtime server running " + PORT)
})
