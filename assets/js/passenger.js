
const map = L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

let marker;

map.on("click",e=>{
if(marker) map.removeLayer(marker);
marker = L.marker(e.latlng).addTo(map);
document.getElementById("pickup").value =
e.latlng.lat.toFixed(5)+","+e.latlng.lng.toFixed(5);
});

function requestRide(){
alert("Ride request sent (demo)");
}
