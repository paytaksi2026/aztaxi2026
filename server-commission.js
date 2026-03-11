const COMMISSION_RATE = 0.20;

function calculateCommission(price){

    const commission = price * COMMISSION_RATE;
    const driverAmount = price - commission;

    return {
        commission: commission.toFixed(2),
        driverAmount: driverAmount.toFixed(2)
    };
}

module.exports = {
    calculateCommission
};
