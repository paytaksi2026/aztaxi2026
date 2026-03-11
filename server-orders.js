
// Basic server order dispatch logic (2km -> 5km -> 8km)

let orders = [];

function createOrder(order){
    orders.push({
        id: Date.now(),
        pickupLat: order.pickupLat,
        pickupLng: order.pickupLng,
        status: "waiting"
    });
}

function getOrders(){
    return orders;
}

module.exports = {
    createOrder,
    getOrders
};
