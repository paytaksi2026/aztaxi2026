
let map=L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

let pickupMarker=null;
let dropMarker=null;
let routeLine=null;

navigator.geolocation.getCurrentPosition(async pos=>{
let lat=pos.coords.latitude;
let lng=pos.coords.longitude;

pickupMarker=L.marker([lat,lng]).addTo(map);
map.setView([lat,lng],15);

let r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
let d=await r.json();
document.getElementById("pickup").value=d.display_name;
});

map.on("click",e=>{
if(!pickupMarker){
pickupMarker=L.marker(e.latlng).addTo(map);
}else{
if(dropMarker) map.removeLayer(dropMarker);
dropMarker=L.marker(e.latlng).addTo(map);
}
});

async function calcRoute(){

if(!pickupMarker||!dropMarker) return;

let p=pickupMarker.getLatLng();
let d=dropMarker.getLatLng();

let url=`https://router.project-osrm.org/route/v1/driving/${p.lng},${p.lat};${d.lng},${d.lat}?overview=full&geometries=geojson`;
let data=await fetch(url).then(r=>r.json());

let coords=data.routes[0].geometry.coordinates.map(c=>[c[1],c[0]]);

if(routeLine) map.removeLayer(routeLine);
routeLine=L.polyline(coords,{color:"blue"}).addTo(map);

let km=data.routes[0].distance/1000;

let rate=document.querySelector(".card.active").dataset.rate;
let price=(km*rate).toFixed(2);

document.getElementById("price").innerText="Qiymət: "+price+" AZN";

}
document.querySelectorAll(".card").forEach(c=>{
c.onclick=()=>{
document.querySelectorAll(".card").forEach(x=>x.classList.remove("active"));
c.classList.add("active");
}
});
