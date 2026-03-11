
// server-multicity.js
// manage multiple cities (Baku, Ganja etc.)

let cities = {
    "baku": {name:"Baku", lat:40.4093, lng:49.8671},
    "ganja": {name:"Ganja", lat:40.6828, lng:46.3606}
};

function getCities(){
    return Object.values(cities);
}

function getCity(id){
    return cities[id];
}

module.exports = {
    getCities,
    getCity
};
