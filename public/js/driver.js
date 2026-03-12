
const socket=io();

function goOnline(){

navigator.geolocation.watchPosition(pos=>{

socket.emit("driver-location",{
lat:pos.coords.latitude,
lng:pos.coords.longitude
});

});

}

socket.on("ride-request",req=>{

let div=document.getElementById("orders");

let btn=document.createElement("button");
btn.innerText="Accept Ride";

div.appendChild(btn);

});
