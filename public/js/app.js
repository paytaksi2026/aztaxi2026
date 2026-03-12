
let map = L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

let pickupMarker=null;
let dropMarker=null;
let routeLine=null;

document.getElementById("locBtn").onclick=()=>{

navigator.geolocation.getCurrentPosition(pos=>{

let lat=pos.coords.latitude;
let lng=pos.coords.longitude;

map.setView([lat,lng],15);

if(pickupMarker) map.removeLayer(pickupMarker);

pickupMarker=L.marker([lat,lng]).addTo(map);

});

};

map.on("click",e=>{

if(!pickupMarker){
pickupMarker=L.marker(e.latlng).addTo(map);
}else{

if(dropMarker) map.removeLayer(dropMarker);

dropMarker=L.marker(e.latlng).addTo(map);

}

});

async function drawRoute(){

if(!pickupMarker||!dropMarker) return;

let p=pickupMarker.getLatLng();
let d=dropMarker.getLatLng();

let url=`https://router.project-osrm.org/route/v1/driving/${p.lng},${p.lat};${d.lng},${d.lat}?overview=full&geometries=geojson`;

let data=await fetch(url).then(r=>r.json());

let coords=data.routes[0].geometry.coordinates.map(c=>[c[1],c[0]]);

if(routeLine) map.removeLayer(routeLine);

routeLine=L.polyline(coords,{color:"#000"}).addTo(map);

let km=data.routes[0].distance/1000;

let active=document.querySelector(".car.active");

let rate=parseFloat(active.dataset.rate);

let price=(km*rate).toFixed(2);

document.getElementById("price").innerText="Qiymət: "+price+" AZN";

}

document.getElementById("rideBtn").onclick=drawRoute;

document.querySelectorAll(".car").forEach(c=>{

c.onclick=function(){

document.querySelectorAll(".car").forEach(x=>x.classList.remove("active"));

this.classList.add("active");

};

});

