
// driver-animation.js
// animate driver movement on map

function animateDriver(marker, newLat, newLng){

    const start = marker.getLatLng();
    const end = L.latLng(newLat, newLng);

    const steps = 20;
    let i = 0;

    const interval = setInterval(()=>{

        i++;

        const lat = start.lat + (end.lat - start.lat) * (i/steps);
        const lng = start.lng + (end.lng - start.lng) * (i/steps);

        marker.setLatLng([lat,lng]);

        if(i >= steps){
            clearInterval(interval);
        }

    },50);

}

window.AzTaxiDriverAnimation = { animateDriver };
