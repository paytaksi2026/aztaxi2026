
const socket=io();

function online(){

navigator.geolocation.watchPosition(pos=>{

socket.emit("driver-location",{
lat:pos.coords.latitude,
lng:pos.coords.longitude
});

});

}

socket.on("ride-offer",req=>{

let div=document.getElementById("orders");

let btn=document.createElement("button");
btn.innerText="Ride qəbul et";

div.appendChild(btn);

});
