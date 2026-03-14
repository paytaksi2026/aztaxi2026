
const map = L.map('map').setView([40.4093,49.8671],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map)

const socket = io()

navigator.geolocation.watchPosition(pos=>{

const lat=pos.coords.latitude
const lng=pos.coords.longitude

socket.emit("driver_location",{
driver_id:1,
lat,
lng
})

})
