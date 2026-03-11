
// Simple passenger order creation (initial version)

function createOrder(pickupLat, pickupLng, destLat, destLng){
    const order = {
        pickupLat,
        pickupLng,
        destLat,
        destLng
    };

    fetch('/api/create-order',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(order)
    })
    .then(res=>res.json())
    .then(data=>{
        alert("Sifariş göndərildi");
        console.log(data);
    })
    .catch(err=>{
        console.error("Order error",err);
    });
}

// Example button trigger
document.addEventListener("DOMContentLoaded",()=>{
    const btn = document.createElement("button");
    btn.innerText = "Maşın çağır";
    btn.style.position="absolute";
    btn.style.bottom="20px";
    btn.style.left="50%";
    btn.style.transform="translateX(-50%)";
    btn.style.padding="15px 25px";
    btn.style.fontSize="18px";
    btn.style.borderRadius="30px";
    btn.style.border="none";
    btn.style.background="#ffd400";

    btn.onclick = ()=>{
        // test coordinates (Baku)
        createOrder(40.4093,49.8671,40.3950,49.8822);
    };

    document.body.appendChild(btn);
});
