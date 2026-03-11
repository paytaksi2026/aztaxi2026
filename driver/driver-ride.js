
// driver-ride.js
// Handles ride states: arrived, start ride, finish ride

let activeRide = null;

function showRideControls(order){

    activeRide = order;

    const box = document.createElement("div");
    box.id = "rideControls";
    box.style.position = "absolute";
    box.style.bottom = "120px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.background = "white";
    box.style.padding = "20px";
    box.style.borderRadius = "10px";
    box.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";

    box.innerHTML = `
        <button id="arrivedBtn">Yerindəyəm</button>
        <button id="startRideBtn">Gedişə başla</button>
        <button id="finishRideBtn">Səfəri bitir</button>
    `;

    document.body.appendChild(box);

    document.getElementById("arrivedBtn").onclick = arrivedPassenger;
    document.getElementById("startRideBtn").onclick = startRide;
    document.getElementById("finishRideBtn").onclick = finishRide;
}

function arrivedPassenger(){

    fetch("/api/ride/arrived",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({orderId:activeRide.id})
    });

    alert("Müştərinin yanındasınız");
}

function startRide(){

    fetch("/api/ride/start",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({orderId:activeRide.id})
    });

    alert("Səfər başladı");
}

function finishRide(){

    fetch("/api/ride/finish",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({orderId:activeRide.id})
    });

    alert("Səfər bitdi");

    const box = document.getElementById("rideControls");
    if(box) box.remove();

    activeRide = null;
}
