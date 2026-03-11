
const { chooseDriver } = require("./modules/ai-dispatch");

let drivers = {
"1":{id:1,location:{lat:40.41,lng:49.87},rating:4.9,activeRides:0},
"2":{id:2,location:{lat:40.42,lng:49.86},rating:4.5,activeRides:1}
};

function createOrder(pickup){

const driver = chooseDriver(pickup,drivers);

console.log("Best driver:",driver);

}

createOrder({lat:40.409,lng:49.867});
