
const socket = io();

const map = L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let marker;

navigator.geolocation.watchPosition(pos=>{

const lat = pos.coords.latitude;
const lng = pos.coords.longitude;

socket.emit("driver-location",{lat,lng});

if(!marker){
marker = L.marker([lat,lng]).addTo(map);
}else{
marker.setLatLng([lat,lng]);
}

});
