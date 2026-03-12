
const socket=io();

let map=L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

async function autocomplete(q){

let url=`https://nominatim.openstreetmap.org/search?format=json&q=${q}`;

let data=await fetch(url).then(r=>r.json());

let box=document.getElementById("suggestions");

box.innerHTML="";

data.slice(0,5).forEach(p=>{

let div=document.createElement("div");
div.innerText=p.display_name;

div.onclick=()=>{
 document.getElementById("pickup").value=p.display_name;
};

box.appendChild(div);

});

}

document.getElementById("pickup").oninput=e=>{
 autocomplete(e.target.value);
};

function navigate(){

let p=document.getElementById("pickup").value;

let url="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p);

window.open(url,"_blank");

}

function requestRide(){

socket.emit("ride-request",{lat:40.4093,lng:49.8671});

alert("Driver axtarılır");

}
