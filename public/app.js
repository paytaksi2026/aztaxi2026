
const map=L.map('map').setView([40.4093,49.8671],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

let fromCoord=null
let toCoord=null
let route=null

async function search(q){

 const url=`https://nominatim.openstreetmap.org/search?format=json&q=${q}`
 const r=await fetch(url)
 return await r.json()

}

function fill(list,data,cb){

 list.innerHTML=""

 data.slice(0,5).forEach(p=>{

  const d=document.createElement("div")
  d.innerText=p.display_name

  d.onclick=()=>{
   list.innerHTML=""
   cb(p)
  }

  list.appendChild(d)

 })

}

document.getElementById("from").oninput=async e=>{

 const data=await search(e.target.value)

 fill(
  document.getElementById("fromList"),
  data,
  p=>{

   fromCoord=[p.lat,p.lon]
   L.marker(fromCoord).addTo(map)

   draw()

  }
 )

}

document.getElementById("to").oninput=async e=>{

 const data=await search(e.target.value)

 fill(
  document.getElementById("toList"),
  data,
  p=>{

   toCoord=[p.lat,p.lon]
   L.marker(toCoord).addTo(map)

   draw()

  }
 )

}

async function draw(){

 if(!fromCoord||!toCoord)return

 const url=`https://router.project-osrm.org/route/v1/driving/${fromCoord[1]},${fromCoord[0]};${toCoord[1]},${toCoord[0]}?overview=full&geometries=geojson`

 const r=await fetch(url)
 const data=await r.json()

 const coords=data.routes[0].geometry.coordinates.map(c=>[c[1],c[0]])

 if(route)map.removeLayer(route)

 route=L.polyline(coords,{color:"green"}).addTo(map)

 map.fitBounds(route.getBounds())

 const dist=data.routes[0].distance/1000

 showPrices(dist)

}

function showPrices(km){

 const prices={
  Ekonom:2+km*0.6,
  Komfort:2.5+km*0.8,
  Biznes:3+km*1.2
 }

 const box=document.getElementById("rideOptions")
 box.innerHTML=""

 Object.entries(prices).forEach(([k,v])=>{

  const card=document.createElement("div")
  card.className="card"

  card.innerHTML=`
  <img src="assets/car.png">
  <div>${k}</div>
  <div class="price">${v.toFixed(2)} ₼</div>
  `

  box.appendChild(card)

 })

}
