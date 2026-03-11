
// passenger-send-order.js
// sends passenger ride request to server

function sendRideRequest(pickupLat, pickupLng, destLat, destLng){

    const order = {
        pickupLat,
        pickupLng,
        destLat,
        destLng
    };

    fetch("/api/passenger/order",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(order)
    })
    .then(res=>res.json())
    .then(data=>{
        alert("Sifariş göndərildi. Driver gözlənilir.");
        console.log(data);
    })
    .catch(err=>{
        console.error("Order send error", err);
    });

}

// demo button
document.addEventListener("DOMContentLoaded",()=>{

    const btn = document.createElement("button");
    btn.innerText = "Ride çağır";
    btn.style.position="absolute";
    btn.style.bottom="80px";
    btn.style.left="50%";
    btn.style.transform="translateX(-50%)";
    btn.style.padding="15px 25px";
    btn.style.border="none";
    btn.style.borderRadius="30px";
    btn.style.fontSize="18px";
    btn.style.background="#ffd400";

    btn.onclick = ()=>{
        // Baku test coords
        sendRideRequest(40.4093,49.8671,40.3950,49.8822);
    };

    document.body.appendChild(btn);

});
