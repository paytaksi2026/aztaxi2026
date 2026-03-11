
// driver-connection.js
// basic driver polling to get orders from server

async function checkOrders(){

    try{

        const res = await fetch("/api/driver/orders");
        const orders = await res.json();

        if(orders && orders.length > 0){
            showIncomingOrder(orders[0]);
        }

    }catch(e){
        console.log("Order check error", e);
    }

}

function showIncomingOrder(order){

    const box = document.createElement("div");
    box.style.position="absolute";
    box.style.top="20px";
    box.style.left="50%";
    box.style.transform="translateX(-50%)";
    box.style.background="white";
    box.style.padding="20px";
    box.style.borderRadius="10px";
    box.style.boxShadow="0 0 10px rgba(0,0,0,0.3)";

    box.innerHTML = `
        <h3>Yeni sifariş</h3>
        <p>Məsafə: ${order.distance} km</p>
        <button id="acceptRide">Qəbul et</button>
    `;

    document.body.appendChild(box);

    document.getElementById("acceptRide").onclick = async ()=>{

        await fetch("/api/driver/accept",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({orderId:order.id})
        });

        box.remove();
        alert("Sifariş qəbul edildi");

    };

}

setInterval(checkOrders,3000);
