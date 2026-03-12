
const socket=io();

let map=L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

let marker=null;

function goOnline(){

navigator.geolocation.watchPosition(pos=>{

let lat=pos.coords.latitude;
let lng=pos.coords.longitude;

if(marker) map.removeLayer(marker);

marker=L.marker([lat,lng]).addTo(map);

socket.emit("driver-location",{lat,lng});

});

}

socket.on("ride-offer",(ride)=>{

let btn=document.createElement("button");

btn.innerText="Ride qəbul et";

document.getElementById("orders").appendChild(btn);

});
