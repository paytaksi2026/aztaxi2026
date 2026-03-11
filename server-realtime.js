
// server-realtime.js
// basic realtime driver connection + order push system

let connectedDrivers = {};

function connectDriver(driverId, socket){
    connectedDrivers[driverId] = socket;
    console.log("Driver connected:", driverId);
}

function disconnectDriver(driverId){
    delete connectedDrivers[driverId];
    console.log("Driver disconnected:", driverId);
}

function sendOrderToDriver(driverId, order){

    const socket = connectedDrivers[driverId];

    if(!socket){
        console.log("Driver not connected:", driverId);
        return false;
    }

    socket.send(JSON.stringify({
        type: "NEW_ORDER",
        data: order
    }));

    return true;
}

module.exports = {
    connectDriver,
    disconnectDriver,
    sendOrderToDriver
};
