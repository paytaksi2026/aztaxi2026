
// passenger-socket.js

const socket = new WebSocket("ws://localhost:3000");

socket.onopen = ()=>{

    socket.send(JSON.stringify({
        type:"passenger_connect",
        passengerId: Date.now()
    }));

};

socket.onmessage = (msg)=>{

    const data = JSON.parse(msg.data);

    if(data.type === "driver_location"){
        console.log("Driver location:",data.lat,data.lng);
    }

};
