
// passenger-payment.js
let paymentMethod = "cash";

function showPaymentOptions(){
    const box = document.createElement("div");
    box.style.position="absolute";
    box.style.bottom="160px";
    box.style.left="50%";
    box.style.transform="translateX(-50%)";
    box.style.background="white";
    box.style.padding="15px";
    box.style.borderRadius="10px";

    box.innerHTML = `
        <button id="cashBtn">💵 Nağd</button>
        <button id="cardBtn">💳 Kart</button>
    `;

    document.body.appendChild(box);

    document.getElementById("cashBtn").onclick = ()=>{
        paymentMethod = "cash";
        alert("Nağd seçildi");
    };

    document.getElementById("cardBtn").onclick = ()=>{
        paymentMethod = "card";
        alert("Kart seçildi");
    };
}

window.AzTaxiPayment={
    showPaymentOptions,
    getMethod:()=>paymentMethod
};
