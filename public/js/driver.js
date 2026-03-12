
const socket = io();

function goOnline(){

 navigator.geolocation.watchPosition(pos=>{

  socket.emit("driver-location",{
   lat:pos.coords.latitude,
   lng:pos.coords.longitude
  });

 });

}

socket.on("ride-offer",(ride)=>{

 let div = document.getElementById("rides");

 let btn = document.createElement("button");

 btn.innerText = "Ride qəbul et";

 div.appendChild(btn);

});
