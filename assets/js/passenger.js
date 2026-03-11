
let map = L.map('map').setView([40.4093,49.8671],13)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

let pickupCoord=null
let destCoord=null

async function search(q,box){
 if(q.length<3)return
 let r=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}`)
 let d=await r.json()
 let html=""
 d.slice(0,5).forEach(i=>{
   html+=`<div onclick="selectPlace(${i.lat},${i.lon},'${i.display_name.replace(/'/g,'')}','${box}')">${i.display_name}</div>`
 })
 document.getElementById(box).innerHTML=html
}

function selectPlace(lat,lon,name,box){
 if(box==="pickupList"){
   document.getElementById("pickup").value=name
   pickupCoord=[lat,lon]
 }else{
   document.getElementById("dest").value=name
   destCoord=[lat,lon]
 }
 document.getElementById(box).innerHTML=""
 map.setView([lat,lon],15)
 L.marker([lat,lon]).addTo(map)
}

document.getElementById("pickup").oninput=e=>search(e.target.value,"pickupList")
document.getElementById("dest").oninput=e=>search(e.target.value,"destList")

function requestRide(){
 if(!pickupCoord||!destCoord){
   alert("Choose pickup and destination")
   return
 }
 alert("Ride request sent")
}
