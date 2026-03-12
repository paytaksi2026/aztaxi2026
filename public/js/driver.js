
const socket = io();

function goOnline(){
    socket.emit("driver-online",{name:"Driver"});
}

socket.on("new-ride",(ride)=>{

    const box = document.getElementById("orders");

    const btn = document.createElement("button");

    btn.innerText = "Accept ride "+ride.rideId;

    btn.onclick = ()=>{
        socket.emit("ride-accept",ride.rideId);
    };

    box.appendChild(btn);

});
