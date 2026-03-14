
const map = L.map('map').setView([40.4093,49.8671],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map)

const socket = io()

socket.on("driver_update",(d)=>{

L.marker([d.lat,d.lng]).addTo(map)

})
