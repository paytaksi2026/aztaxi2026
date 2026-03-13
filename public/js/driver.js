
const socket=io()

let map=L.map('map').setView([40.4093,49.8671],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map)

function goOnline(){

 navigator.geolocation.watchPosition(pos=>{

  socket.emit("driver-location",{
   lat:pos.coords.latitude,
   lng:pos.coords.longitude
  })

 })

}

socket.on("ride-offer",ride=>{

 document.getElementById("ride").innerText="New Ride Request"

})

function finishRide(){

 socket.emit("ride-finish",{status:"done"})

}
