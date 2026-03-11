
// passenger-ride.js
// passenger tracking + rating after ride

let driverMarker = null;
let mapRef = null;

function startTracking(map){
    mapRef = map;

    setInterval(async ()=>{

        try{

            const res = await fetch("/api/ride/driver-location");
            const data = await res.json();

            if(!data) return;

            if(!driverMarker){

                const icon = L.icon({
                    iconUrl:'https://cdn-icons-png.flaticon.com/512/744/744465.png',
                    iconSize:[32,32]
                });

                driverMarker = L.marker([data.lat,data.lng],{icon}).addTo(mapRef);

            }else{

                driverMarker.setLatLng([data.lat,data.lng]);

            }

        }catch(e){
            console.log("tracking error",e);
        }

    },3000);
}

function showRating(){

    const box = document.createElement("div");
    box.style.position="absolute";
    box.style.top="50%";
    box.style.left="50%";
    box.style.transform="translate(-50%,-50%)";
    box.style.background="white";
    box.style.padding="20px";
    box.style.borderRadius="10px";
    box.style.boxShadow="0 0 10px rgba(0,0,0,0.3)";

    box.innerHTML=`
        <h3>Sürücünü qiymətləndir</h3>
        <button onclick="rateDriver(5)">⭐⭐⭐⭐⭐</button>
    `;

    document.body.appendChild(box);
}

function rateDriver(stars){

    fetch("/api/ride/rate",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({stars})
    });

    alert("Təşəkkürlər!");
    location.reload();
}

window.AzTaxiPassengerRide={
    startTracking,
    showRating
};
