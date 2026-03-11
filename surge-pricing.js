
// surge-pricing.js
// dynamic price multiplier

function calculateSurge(basePrice, demandLevel){

    let multiplier = 1;

    if(demandLevel > 80) multiplier = 1.5;
    else if(demandLevel > 60) multiplier = 1.3;
    else if(demandLevel > 40) multiplier = 1.15;

    return (basePrice * multiplier).toFixed(2);

}

window.AzTaxiSurge = { calculateSurge };
