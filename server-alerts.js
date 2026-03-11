
// server-alerts.js
let alerts = {};

function pushAlert(driverId,message){

    if(!alerts[driverId]){
        alerts[driverId]=[];
    }

    alerts[driverId].push({
        message,
        time:Date.now()
    });

}

function getAlerts(driverId){

    const list = alerts[driverId] || [];
    alerts[driverId] = [];
    return list;

}

module.exports={
    pushAlert,
    getAlerts
};
