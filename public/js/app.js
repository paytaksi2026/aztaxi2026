
let map = L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

let pickupMarker=null;
let dropMarker=null;
let routeLine=null;

navigator.geolocation.getCurrentPosition(async pos=>{

let lat=pos.coords.latitude;
let lng=pos.coords.longitude;

pickupMarker=L.marker([lat,lng]).addTo(map);

map.setView([lat,lng],15);

let url=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
let data=await fetch(url).then(r=>r.json());

document.getElementById("pickup").value=data.display_name;

});

map.on("click",function(e){

if(!pickupMarker){
pickupMarker=L.marker(e.latlng).addTo(map);
}else{
if(dropMarker) map.removeLayer(dropMarker);
dropMarker=L.marker(e.latlng).addTo(map);
}

});

async function createRoute(){

if(!pickupMarker || !dropMarker) return;

let p=pickupMarker.getLatLng();
let d=dropMarker.getLatLng();

let url=`https://router.project-osrm.org/route/v1/driving/${p.lng},${p.lat};${d.lng},${d.lat}?overview=full&geometries=geojson`;

let data=await fetch(url).then(r=>r.json());

let coords=data.routes[0].geometry.coordinates.map(c=>[c[1],c[0]]);

if(routeLine) map.removeLayer(routeLine);

routeLine=L.polyline(coords,{color:"blue"}).addTo(map);

let km=data.routes[0].distance/1000;

let active=document.querySelector(".card.active");
let rate=parseFloat(active.dataset.price);

let price=(km*rate).toFixed(2);

document.getElementById("price").innerText="Price: "+price+" AZN";

}

document.querySelectorAll(".card").forEach(c=>{
c.onclick=function(){
document.querySelectorAll(".card").forEach(x=>x.classList.remove("active"));
this.classList.add("active");
};
});

// fake drivers
for(let i=0;i<5;i++){

let lat=40.39+Math.random()*0.05;
let lng=49.84+Math.random()*0.05;

L.marker([lat,lng],{
icon:L.icon({
iconUrl:"https://cdn-icons-png.flaticon.com/512/744/744465.png",
iconSize:[32,32]
})
}).addTo(map);

}
