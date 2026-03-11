
// Driver order receiving and 15 second accept timer (basic version)

let currentOrder = null;
let timer = null;
let seconds = 15;

function showOrder(order){
    currentOrder = order;
    seconds = 15;

    const box = document.createElement("div");
    box.id = "orderBox";
    box.style.position = "absolute";
    box.style.top = "20px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.background = "white";
    box.style.padding = "20px";
    box.style.borderRadius = "10px";
    box.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";

    box.innerHTML = `
        <h3>Yeni sifariş</h3>
        <p>Müştəri məsafə: ${order.distance} km</p>
        <p id="timerText">Qəbul vaxtı: 15</p>
        <button id="acceptBtn">Qəbul et</button>
    `;

    document.body.appendChild(box);

    document.getElementById("acceptBtn").onclick = acceptOrder;

    timer = setInterval(()=>{
        seconds--;
        document.getElementById("timerText").innerText = "Qəbul vaxtı: " + seconds;

        if(seconds <= 0){
            clearInterval(timer);
            document.getElementById("orderBox").remove();
            currentOrder = null;
        }
    },1000);
}

function acceptOrder(){
    clearInterval(timer);

    fetch("/api/accept-order",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({orderId: currentOrder.id})
    });

    document.getElementById("orderBox").remove();
    alert("Sifariş qəbul edildi");
}

// Fake test order every 20 seconds (for testing)
setInterval(()=>{
    if(!currentOrder){
        showOrder({
            id: Date.now(),
            distance: (Math.random()*3).toFixed(1)
        });
    }
},20000);
