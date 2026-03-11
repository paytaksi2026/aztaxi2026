
// passenger-live-map.js
// shows moving drivers on passenger map

let driverMarkers = {};

async function updateDrivers(map){

    try{

        const res = await fetch("/api/live-drivers");
        const drivers = await res.json();

        drivers.forEach(d=>{

            if(!driverMarkers[d.id]){

                const icon = L.icon({
                    iconUrl:'https://cdn-icons-png.flaticon.com/512/744/744465.png',
                    iconSize:[32,32]
                });

                driverMarkers[d.id] = L.marker([d.lat,d.lng],{icon}).addTo(map);

            }else{

                driverMarkers[d.id].setLatLng([d.lat,d.lng]);

            }

        });

    }catch(e){
        console.log("driver map error",e);
    }

}

function startLiveDriverMap(map){
    setInterval(()=>updateDrivers(map),3000);
}
