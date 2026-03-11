
// AzTaxi order dispatch system
// Sends order to nearest drivers sequentially with 15s timeout

const { findDrivers } = require('./server-radius');

let activeOrders = {};

function dispatchOrder(order, drivers){

    const result = findDrivers(
        {lat: order.pickupLat, lng: order.pickupLng},
        drivers
    );

    const queue = result.drivers.slice();
    activeOrders[order.id] = { order, queue };

    sendNextDriver(order.id);
}

function sendNextDriver(orderId){
    const data = activeOrders[orderId];
    if(!data) return;

    const driver = data.queue.shift();

    if(!driver){
        console.log("No drivers left for order", orderId);
        delete activeOrders[orderId];
        return;
    }

    console.log("Sending order", orderId, "to driver", driver.id);

    driver.currentOrder = orderId;

    setTimeout(()=>{
        if(driver.currentOrder === orderId){
            console.log("Driver did not accept, moving to next");
            driver.currentOrder = null;
            sendNextDriver(orderId);
        }
    },15000);
}

function acceptOrder(orderId, driverId){
    const data = activeOrders[orderId];
    if(!data) return false;

    console.log("Driver accepted order", orderId);

    delete activeOrders[orderId];
    return true;
}

module.exports = {
    dispatchOrder,
    acceptOrder
};
