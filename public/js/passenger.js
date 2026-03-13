
const socket=io();

let map=L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

let driverMarkers={};

socket.on("drivers-update",drivers=>{

 for(let id in drivers){

  if(driverMarkers[id]){

   driverMarkers[id].setLatLng([drivers[id].lat,drivers[id].lng]);

  }else{

   driverMarkers[id]=L.marker([drivers[id].lat,drivers[id].lng]).addTo(map);

  }

 }

});

let pickupInput=document.getElementById("pickup");
let dropInput=document.getElementById("drop");

new google.maps.places.Autocomplete(pickupInput);
new google.maps.places.Autocomplete(dropInput);

function requestRide(){

 socket.emit("ride-request",{lat:40.4093,lng:49.8671});

}
