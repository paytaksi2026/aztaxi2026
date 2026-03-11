
const socket = io();

const map = L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let marker;

map.on("click",(e)=>{
if(marker) map.removeLayer(marker);
marker = L.marker(e.latlng).addTo(map);
});

function requestRide(){
if(!marker) return alert("Select pickup");
socket.emit("create-order",marker.getLatLng());
alert("Ride requested");
}
