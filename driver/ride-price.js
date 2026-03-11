
// ride-price.js
// Calculates AzTaxi ride price and waiting timer

let rideData = {
    startLat:null,
    startLng:null,
    endLat:null,
    endLng:null,
    distanceKm:0,
    waitingSeconds:0,
    waitingStarted:false
};

const BASE_PRICE = 3.50;
const FREE_KM = 3;
const KM_PRICE = 0.35;
const FREE_WAIT_MIN = 3;
const WAIT_PRICE_PER_MIN = 0.05;

function startWaitingTimer(){

    rideData.waitingStarted = true;

    setInterval(()=>{
        if(!rideData.waitingStarted) return;

        rideData.waitingSeconds++;

        const mins = Math.floor(rideData.waitingSeconds / 60);

        if(mins > FREE_WAIT_MIN){
            const paidMins = mins - FREE_WAIT_MIN;
            const waitCost = paidMins * WAIT_PRICE_PER_MIN;

            console.log("Waiting cost:", waitCost.toFixed(2),"AZN");
        }

    },1000);
}

function calculateRidePrice(distanceKm){

    rideData.distanceKm = distanceKm;

    let price = BASE_PRICE;

    if(distanceKm > FREE_KM){
        const extra = distanceKm - FREE_KM;
        price += extra * KM_PRICE;
    }

    const mins = Math.floor(rideData.waitingSeconds / 60);

    if(mins > FREE_WAIT_MIN){
        const paidMins = mins - FREE_WAIT_MIN;
        price += paidMins * WAIT_PRICE_PER_MIN;
    }

    return price.toFixed(2);
}

function finishRide(distanceKm){

    rideData.waitingStarted = false;

    const finalPrice = calculateRidePrice(distanceKm);

    alert("Səfər bitdi. Qiymət: " + finalPrice + " AZN");

    return finalPrice;
}

window.AzTaxiPrice = {
    startWaitingTimer,
    calculateRidePrice,
    finishRide
};
