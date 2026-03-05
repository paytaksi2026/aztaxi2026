
const socket = io()

let map = L.map("map").setView([40.4093,49.8671],13)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

let markers = {}

socket.on("drivers-update",(drivers)=>{

Object.values(markers).forEach(m=>map.removeLayer(m))
markers = {}

for(let id in drivers){

let d = drivers[id]

let marker = L.marker([d.lat,d.lng]).addTo(map)

markers[id] = marker

}

})

function orderRide(){

let km = Math.random()*10

let price = 3.5

if(km>3){
price = 3.5 + (km-3)*0.30
}

document.getElementById("price").innerHTML =
"Qiymət: "+price.toFixed(2)+" AZN"

alert("Driver axtarılır")

}
