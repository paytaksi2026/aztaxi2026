
// driver-socket.js

const socket = new WebSocket("ws://localhost:3000");

socket.onopen = ()=>{

    socket.send(JSON.stringify({
        type:"driver_connect",
        driverId: Date.now()
    }));

};

function sendDriverLocation(lat,lng){

    socket.send(JSON.stringify({
        type:"driver_location",
        lat,
        lng
    }));

}
