
let map=L.map('map').setView([40.4093,49.8671],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map)

let pickupMarker=null
let routeLine=null

map.on("click",e=>{

if(!pickupMarker){

pickupMarker=L.marker(e.latlng).addTo(map)

}else{

if(routeLine) map.removeLayer(routeLine)

routeLine=L.polyline([pickupMarker.getLatLng(),e.latlng],{color:"black"}).addTo(map)

document.getElementById("driverCard").style.display="block"

}

})

document.querySelector(".ride").onclick=()=>{

setTimeout(()=>{

document.getElementById("rating").style.display="block"

},4000)

}

function closeRating(){

document.getElementById("rating").style.display="none"

}
