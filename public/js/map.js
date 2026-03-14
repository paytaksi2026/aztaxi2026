
let map = L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const carIcon = L.icon({
 iconUrl:'https://cdn-icons-png.flaticon.com/512/744/744465.png',
 iconSize:[32,32]
});

const socket = io();

socket.on("driverMove", d=>{
 L.marker([d.lat,d.lng],{icon:carIcon}).addTo(map)
});

async function searchPlace(q){
 let r = await fetch("https://nominatim.openstreetmap.org/search?format=json&q="+q)
 let j = await r.json()
 return j
}

async function autocomplete(input, list){

 input.addEventListener("input", async ()=>{

  let q=input.value
  if(q.length<3) return

  let places=await searchPlace(q)

  list.innerHTML=""

  places.slice(0,5).forEach(p=>{

   let li=document.createElement("div")
   li.innerText=p.display_name

   li.onclick=()=>{

    input.value=p.display_name
    map.setView([p.lat,p.lon],15)

   }

   list.appendChild(li)

  })

 })

}
