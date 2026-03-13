
const socket=io();

let map=L.map('map').setView([40.4093,49.8671],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map)

let driverMarkers={}

socket.on("drivers",data=>{

 for(let id in data){

  if(driverMarkers[id]){

   driverMarkers[id].setLatLng([data[id].lat,data[id].lng])

  }else{

   driverMarkers[id]=L.marker([data[id].lat,data[id].lng]).addTo(map)

  }

 }

})

function requestRide(){

 socket.emit("ride-request",{lat:40.4093,lng:49.8671})

}
