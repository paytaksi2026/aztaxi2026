
var map = L.map('map').setView([40.4093,49.8671], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19
}).addTo(map);

var marker = L.marker([40.4093,49.8671]).addTo(map);

document.getElementById("locBtn").onclick = function(){

navigator.geolocation.getCurrentPosition(function(pos){

var lat = pos.coords.latitude;
var lng = pos.coords.longitude;

map.setView([lat,lng],15);

if(marker){
map.removeLayer(marker);
}

marker = L.marker([lat,lng]).addTo(map);

});

}
