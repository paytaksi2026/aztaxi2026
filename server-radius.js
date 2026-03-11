
// Driver radius search logic: 2km -> 5km -> 8km

function distance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2-lat1) * Math.PI / 180;
    const dLon = (lon2-lon1) * Math.PI / 180;
    const a =
        0.5 - Math.cos(dLat)/2 +
        Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
        (1 - Math.cos(dLon))/2;

    return R * 2 * Math.asin(Math.sqrt(a));
}

function findDrivers(pickup, drivers){

    const radiusSteps = [2,5,8];

    for(let r of radiusSteps){

        const found = drivers.filter(d=>{
            const dist = distance(
                pickup.lat,
                pickup.lng,
                d.lat,
                d.lng
            );
            return dist <= r;
        });

        if(found.length > 0){
            return {
                radius:r,
                drivers:found
            };
        }
    }

    return {
        radius:null,
        drivers:[]
    };
}

module.exports = {
    findDrivers
};
