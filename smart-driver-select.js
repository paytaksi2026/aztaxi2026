function distance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2-lat1) * Math.PI/180;
    const dLon = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(dLat/2)*Math.sin(dLat/2) +
              Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180) *
              Math.sin(dLon/2)*Math.sin(dLon/2);
    const c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    return R*c;
}

function findNearestDriver(pickup, drivers){
    let nearest=null;
    let min=Infinity;
    drivers.forEach(d=>{
        const dist = distance(pickup.lat,pickup.lng,d.lat,d.lng);
        if(dist < min){
            min = dist;
            nearest = d;
        }
    });
    return nearest;
}

window.AzTaxiSmartDriver={findNearestDriver};
