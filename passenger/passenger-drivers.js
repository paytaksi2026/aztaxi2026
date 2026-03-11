// Shows drivers on passenger map and refreshes every 3 seconds

let driverMarkers = [];

function loadDrivers(map){
    setInterval(async ()=>{
        const res = await fetch("/api/drivers");
        const drivers = await res.json();

        driverMarkers.forEach(m => map.removeLayer(m));
        driverMarkers = [];

        drivers.forEach(d=>{
            const icon = L.icon({
                iconUrl:'https://cdn-icons-png.flaticon.com/512/744/744465.png',
                iconSize:[32,32]
            });

            const m = L.marker([d.lat,d.lng],{icon}).addTo(map);
            driverMarkers.push(m);
        });
    },3000);
}
