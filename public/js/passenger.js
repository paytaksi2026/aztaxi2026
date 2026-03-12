
const socket=io();

let map=L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

let driversLayer={};

socket.on("driver-update",d=>{

 if(driversLayer[d.id]){
   driversLayer[d.id].setLatLng([d.lat,d.lng]);
 }else{
   driversLayer[d.id]=L.marker([d.lat,d.lng]).addTo(map);
 }

});
