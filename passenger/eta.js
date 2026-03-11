function calculateETA(distanceKm, speed=30){
    const hours = distanceKm / speed;
    const minutes = Math.round(hours * 60);
    return minutes;
}
window.AzTaxiETA = {calculateETA};
