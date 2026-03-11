
// admin-drivers.js

async function loadDrivers(){

    const res = await fetch("/api/admin/drivers");
    const drivers = await res.json();

    const box = document.getElementById("drivers");
    box.innerHTML = "";

    drivers.forEach(d=>{

        const row = document.createElement("div");
        row.innerHTML = d.name + " - " + d.car;

        const btn = document.createElement("button");
        btn.innerText = "Təsdiqlə";

        btn.onclick = async ()=>{

            await fetch("/api/admin/approve-driver",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({driverId:d.id})
            });

            alert("Driver təsdiqləndi");
        };

        row.appendChild(btn);
        box.appendChild(row);

    });

}

loadDrivers();
