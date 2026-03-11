// Simple in-memory driver storage

let drivers = [];

function updateDriver(lat,lng){
    drivers = [{lat,lng}];
}

function getDrivers(){
    return drivers;
}

module.exports = {updateDriver,getDrivers};
