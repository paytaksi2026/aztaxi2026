
// Load and display drivers on passenger map every 3 seconds

let driverMarkers = [];

function showDrivers(map){
    setInterval(async ()=>{
        try{
            const res = await fetch("/api/drivers");
            const drivers = await res.json();

            driverMarkers.forEach(m => map.removeLayer(m));
            driverMarkers = [];

            drivers.forEach(d=>{
                const taxiIcon = L.icon({
                    iconUrl:'https://cdn-icons-png.flaticon.com/512/744/744465.png',
                    iconSize:[32,32]
                });

                const marker = L.marker([d.lat, d.lng], {icon: taxiIcon}).addTo(map);
                driverMarkers.push(marker);
            });

        }catch(e){
            console.log("Driver load error", e);
        }
    },3000);
}
