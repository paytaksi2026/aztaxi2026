
// driver-rating.js
// store and calculate driver ratings

let ratings = {};

function addRating(driverId, stars){

    if(!ratings[driverId]){
        ratings[driverId] = [];
    }

    ratings[driverId].push(stars);

}

function getRating(driverId){

    const list = ratings[driverId] || [];

    if(list.length === 0) return 5;

    const sum = list.reduce((a,b)=>a+b,0);

    return (sum / list.length).toFixed(2);

}

window.AzTaxiDriverRating = {
    addRating,
    getRating
};
