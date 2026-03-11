
async function loadProfile(){
    const res = await fetch("/api/user/profile");
    const data = await res.json();

    const box = document.createElement("div");
    box.style.position="absolute";
    box.style.top="20px";
    box.style.left="20px";
    box.style.background="white";
    box.style.padding="10px";
    box.style.borderRadius="8px";

    box.innerHTML = "Ad: " + data.name + "<br>Telefon: " + data.phone;
    document.body.appendChild(box);
}
