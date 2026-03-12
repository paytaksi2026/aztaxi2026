
const socket = io();

let map = L.map('map').setView([40.4093,49.8671],7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

let pickup=null;
let drop=null;
let route=null;

map.on("click",(e)=>{

 if(!pickup){
  pickup = L.marker(e.latlng).addTo(map);
 }else{
  if(drop) map.removeLayer(drop);
  drop = L.marker(e.latlng).addTo(map);
 }

});

async function calculate(){

 if(!pickup || !drop) return;

 let p = pickup.getLatLng();
 let d = drop.getLatLng();

 let url=`https://router.project-osrm.org/route/v1/driving/${p.lng},${p.lat};${d.lng},${d.lat}?overview=full&geometries=geojson`;

 let data = await fetch(url).then(r=>r.json());

 let coords = data.routes[0].geometry.coordinates.map(c=>[c[1],c[0]]);

 if(route) map.removeLayer(route);

 route = L.polyline(coords,{color:"black"}).addTo(map);

 let km = data.routes[0].distance/1000;

 let rate = parseFloat(document.getElementById("package").value);

 let price = (km * rate).toFixed(2);

 document.getElementById("price").innerText = "Qiymət: " + price + " AZN";

 socket.emit("ride-request",{lat:p.lat,lng:p.lng});

}
