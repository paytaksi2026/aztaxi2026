
// AI Dispatch Module for AzTaxi
// Chooses best driver using distance + rating + workload

function haversine(a,b){
const R=6371;
const dLat=(b.lat-a.lat)*Math.PI/180;
const dLng=(b.lng-a.lng)*Math.PI/180;
const sa=Math.sin(dLat/2)**2 +
Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*
Math.sin(dLng/2)**2;
return R*2*Math.atan2(Math.sqrt(sa),Math.sqrt(1-sa));
}

function chooseDriver(pickup,drivers){

let best=null;
let bestScore=999999;

Object.values(drivers).forEach(d=>{

const dist = haversine(pickup,d.location);
const ratingFactor = (5 - (d.rating || 4.5));
const loadFactor = d.activeRides || 0;

const score = dist*2 + ratingFactor*3 + loadFactor*5;

if(score < bestScore){
bestScore = score;
best = d;
}

});

return best;
}

module.exports = { chooseDriver };
