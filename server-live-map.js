
// server-live-map.js
// store live driver locations

let drivers = {};

function updateDriver(id,lat,lng){

    drivers[id] = {
        id,
        lat,
        lng,
        time:Date.now()
    };

}

function getDrivers(){

    return Object.values(drivers);

}

module.exports = {
    updateDriver,
    getDrivers
};
