
// driver-eta-live.js
// calculate live ETA to passenger

function calculateDriverETA(driver, passenger){

    const R = 6371;

    const dLat = (passenger.lat - driver.lat) * Math.PI / 180;
    const dLon = (passenger.lng - driver.lng) * Math.PI / 180;

    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(driver.lat * Math.PI/180) *
        Math.cos(passenger.lat * Math.PI/180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    const avgSpeed = 30; // km/h
    const minutes = Math.round((distance / avgSpeed) * 60);

    return minutes;
}

window.AzTaxiDriverETA = { calculateDriverETA };
