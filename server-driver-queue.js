
// server-driver-queue.js
// Handles sending orders to drivers one by one with 15 second timeout

let driverQueues = {};

function sendOrderToDrivers(order, drivers){

    const queue = [...drivers];
    driverQueues[order.id] = queue;

    processNext(order.id);
}

function processNext(orderId){

    const queue = driverQueues[orderId];

    if(!queue || queue.length === 0){
        console.log("No drivers left for order", orderId);
        return;
    }

    const driver = queue.shift();

    console.log("Sending order", orderId, "to driver", driver.id);

    driver.currentOrder = orderId;

    setTimeout(()=>{

        if(driver.currentOrder === orderId){
            console.log("Driver timeout, sending to next driver");
            driver.currentOrder = null;
            processNext(orderId);
        }

    },15000);
}

function acceptDriverOrder(orderId, driverId){

    console.log("Order accepted", orderId, "driver", driverId);

    delete driverQueues[orderId];

}

module.exports = {
    sendOrderToDrivers,
    acceptDriverOrder
};
