
// server-payments.js
let payments = [];

function savePayment(data){
    payments.push({
        orderId:data.orderId,
        driverId:data.driverId,
        amount:data.amount,
        method:data.method,
        time:Date.now()
    });
}

function getDriverEarnings(driverId){
    return payments
        .filter(p=>p.driverId===driverId)
        .reduce((sum,p)=>sum+p.amount,0);
}

module.exports={
    savePayment,
    getDriverEarnings
};
