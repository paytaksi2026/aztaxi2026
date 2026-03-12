
const socket=io();

function requestRide(){

let req={
lat:40.4,
lng:49.86,
payment:document.getElementById("payment").value
};

socket.emit("passenger-request",req);

alert("Searching drivers within 3km");

}
