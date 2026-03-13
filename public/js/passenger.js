
const socket=io()

let map=L.map('map').setView([40.4093,49.8671],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map)

let markers={}

socket.on("drivers-update",drivers=>{

 for(let id in drivers){

  if(markers[id]){

   markers[id].setLatLng([drivers[id].lat,drivers[id].lng])

  }else{

   markers[id]=L.marker([drivers[id].lat,drivers[id].lng]).addTo(map)

  }

 }

})

let pickup=document.getElementById("pickup")
let drop=document.getElementById("drop")

new google.maps.places.Autocomplete(pickup)
new google.maps.places.Autocomplete(drop)

function requestRide(){

 socket.emit("ride-request",{lat:40.4093,lng:49.8671})

}
