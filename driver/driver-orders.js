
// Driver order receive and accept (basic version)

let currentOrder = null;
let orderTimer = null;
let timeLeft = 15;

function showOrder(order){
    currentOrder = order;
    timeLeft = 15;

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

    const title = document.createElement("div");
    title.innerText = "Yeni sifariş";

    const timer = document.createElement("div");
    timer.id = "orderTimer";
    timer.innerText = "15 saniyə";

    const acceptBtn = document.createElement("button");
    acceptBtn.innerText = "Qəbul et";
    acceptBtn.onclick = acceptOrder;

    box.appendChild(title);
    box.appendChild(timer);
    box.appendChild(acceptBtn);

    document.body.appendChild(box);

    orderTimer = setInterval(()=>{
        timeLeft--;
        document.getElementById("orderTimer").innerText = timeLeft + " saniyə";

        if(timeLeft <= 0){
            clearInterval(orderTimer);
            document.getElementById("orderBox").remove();
            currentOrder = null;
        }
    },1000);
}

function acceptOrder(){
    if(!currentOrder) return;

    fetch("/api/accept-order",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({orderId:currentOrder.id})
    });

    clearInterval(orderTimer);
    document.getElementById("orderBox").remove();

    alert("Sifariş qəbul edildi");
}
