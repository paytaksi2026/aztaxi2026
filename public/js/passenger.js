
const socket=io();

let map=L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

document.getElementById("rideBtn").onclick=()=>{

 socket.emit("ride-request",{lat:40.4093,lng:49.8671});

 document.getElementById("status").innerText="Driver axtarılır...";

};

socket.on("ride-started",()=>{
 document.getElementById("status").innerText="Ride başladı";
});

socket.on("ride-finished",()=>{
 document.getElementById("status").innerText="Ride bitdi";
});
