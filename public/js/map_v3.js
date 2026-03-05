
var map = L.map('map').setView([40.4093,49.8671], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom:19
}).addTo(map);

var marker = L.marker([40.4093,49.8671]).addTo(map);

function calcRoute(){

var distance=(Math.random()*6+1).toFixed(2);
document.getElementById("distance").innerText=distance;

var price=3.5;
if(distance>3){
price+=(distance-3)*0.30;
}

document.getElementById("price").innerText=price.toFixed(2);
}
