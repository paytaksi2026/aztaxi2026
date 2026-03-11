
// ai-driver-dispatch.js
// choose best driver based on distance + rating

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

function selectBestDriver(pickup, drivers){

    let best = null;
    let bestScore = Infinity;

    drivers.forEach(d=>{

        const dist = distance(pickup.lat, pickup.lng, d.lat, d.lng);

        const ratingFactor = (5 - (d.rating || 5));

        const score = dist + ratingFactor;

        if(score < bestScore){
            bestScore = score;
            best = d;
        }

    });

    return best;

}

window.AzTaxiAIDispatch = { selectBestDriver };
