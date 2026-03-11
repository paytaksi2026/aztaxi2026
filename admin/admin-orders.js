
// admin-orders.js

async function loadOrders(){

    const res = await fetch("/api/admin/orders");
    const orders = await res.json();

    const box = document.getElementById("orders");
    box.innerHTML = "";

    orders.forEach(o=>{

        const row = document.createElement("div");

        row.innerHTML = "Order #" + o.id + " | " + o.price + " AZN";

        box.appendChild(row);

    });

}

setInterval(loadOrders,5000);
