
// demand-prediction.js
// simple demand prediction based on order count

function predictDemand(orderCount){

    if(orderCount > 100) return "very_high";
    if(orderCount > 60) return "high";
    if(orderCount > 30) return "medium";
    return "low";

}

window.AzTaxiDemand = { predictDemand };
