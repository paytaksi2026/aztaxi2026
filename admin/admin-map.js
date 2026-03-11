
let map = L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

let markers=[];

async function loadDrivers(){

    const res = await fetch("/api/admin/live-drivers");
    const drivers = await res.json();

    markers.forEach(m=>map.removeLayer(m));
    markers=[];

    drivers.forEach(d=>{

        const icon = L.icon({
            iconUrl:'https://cdn-icons-png.flaticon.com/512/744/744465.png',
            iconSize:[32,32]
        });

        const m = L.marker([d.lat,d.lng],{icon}).addTo(map);
        markers.push(m);

    });

}

setInterval(loadDrivers,3000);
