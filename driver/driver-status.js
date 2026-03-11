
// Driver online/offline toggle

let driverOnline = false;

function toggleDriverStatus(){
    driverOnline = !driverOnline;

    const btn = document.getElementById("driverStatusBtn");

    if(driverOnline){
        btn.innerText = "ONLINE";
        btn.style.background = "green";
    }else{
        btn.innerText = "OFFLINE";
        btn.style.background = "red";
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const btn = document.createElement("button");
    btn.id = "driverStatusBtn";
    btn.innerText = "OFFLINE";
    btn.style.position = "absolute";
    btn.style.bottom = "20px";
    btn.style.left = "50%";
    btn.style.transform = "translateX(-50%)";
    btn.style.padding = "15px 25px";
    btn.style.fontSize = "18px";
    btn.style.borderRadius = "30px";
    btn.style.border = "none";
    btn.style.background = "red";
    btn.style.color = "white";

    btn.onclick = toggleDriverStatus;

    document.body.appendChild(btn);
});
