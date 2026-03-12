
const socket=io();
let map=L.map('map').setView([40.4093,49.8671],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

let drivers={};

socket.on("driver-update",d=>{
 if(drivers[d.id]){
   drivers[d.id].setLatLng([d.lat,d.lng]);
 }else{
   drivers[d.id]=L.marker([d.lat,d.lng]).addTo(map);
 }
});

document.getElementById("rideBtn").onclick=()=>{
 socket.emit("ride-request",{lat:40.4093,lng:49.8671});
 document.getElementById("status").innerText="Driver axtarılır...";
};

socket.on("ride-started",()=>{
 document.getElementById("status").innerText="Ride başladı";
});

socket.on("ride-finished",()=>{
 document.getElementById("status").innerText="Ride bitdi. Rating ver.";
});
