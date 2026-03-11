
// promo-system.js
// basic promo code discount

const PROMOS = {
    "AZTAXI5": 5,
    "WELCOME3": 3
};

function applyPromo(code, price){

    const discount = PROMOS[code];

    if(!discount) return price;

    const newPrice = Math.max(0, price - discount);

    return newPrice;

}

window.AzTaxiPromo = { applyPromo };
