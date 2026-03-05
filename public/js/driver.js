
const socket = io()

let map = L.map('map').setView([40.4093,49.8671],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

navigator.geolocation.watchPosition((pos)=>{

let lat = pos.coords.latitude
let lng = pos.coords.longitude

socket.emit("driver-location",{lat,lng})

})

socket.on("driver-new-order",(order)=>{

document.getElementById("popup").style.display="flex"

document.getElementById("orderInfo").innerHTML=
"Pickup: "+order.pickup+"<br>"+
"Destination: "+order.destination+"<br>"+
"Distance: "+order.distance+" km<br>"+
"Price: "+order.price+" AZN"

})

function acceptOrder(){

socket.emit("driver-accept",{status:"accepted"})
document.getElementById("popup").style.display="none"

}
