
const socket = io();

function requestRide(){

    const pkg = document.getElementById("package").value;

    socket.emit("ride-request",{
        pickup:"A",
        drop:"B",
        package:pkg
    });

    document.getElementById("status").innerText="Searching driver...";
}

socket.on("ride-accepted",(data)=>{
    document.getElementById("status").innerText="Driver accepted ride";
});
