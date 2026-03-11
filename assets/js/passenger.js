
const socket = io();

const map = L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let pickupMarker;
let driverMarkers = {};

map.on("click",(e)=>{
if(pickupMarker) map.removeLayer(pickupMarker);
pickupMarker = L.marker(e.latlng).addTo(map);
});

function requestRide(){
if(!pickupMarker) return alert("Select pickup point");
socket.emit("create-order",pickupMarker.getLatLng());
alert("Ride requested");
}

socket.on("drivers",(drivers)=>{

Object.keys(driverMarkers).forEach(id=>{
if(!drivers[id]){
map.removeLayer(driverMarkers[id]);
delete driverMarkers[id];
}
});

Object.entries(drivers).forEach(([id,d])=>{

if(!driverMarkers[id]){
driverMarkers[id] = L.marker([d.lat,d.lng]).addTo(map);
}else{
driverMarkers[id].setLatLng([d.lat,d.lng]);
}

});

});
