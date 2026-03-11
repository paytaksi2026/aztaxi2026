
// driver-earnings.js
async function loadEarnings(){

    const res = await fetch("/api/driver/earnings");
    const data = await res.json();

    const box = document.createElement("div");
    box.style.position="absolute";
    box.style.top="20px";
    box.style.right="20px";
    box.style.background="white";
    box.style.padding="10px";
    box.style.borderRadius="8px";

    box.innerHTML = "Bugünkü qazanc: " + data.total + " AZN";

    document.body.appendChild(box);
}

setInterval(loadEarnings,10000);
