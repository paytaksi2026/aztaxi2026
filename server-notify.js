
let driverNotifications = {};

function sendDriverNotification(driverId,message){

    if(!driverNotifications[driverId]){
        driverNotifications[driverId]=[];
    }

    driverNotifications[driverId].push({
        message,
        time:Date.now()
    });

}

function getDriverNotifications(driverId){
    return driverNotifications[driverId] || [];
}

module.exports={
    sendDriverNotification,
    getDriverNotifications
};
