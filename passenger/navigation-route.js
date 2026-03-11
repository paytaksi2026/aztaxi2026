
// navigation-route.js
// draw full route from pickup to destination

function drawFullRoute(map, pickup, destination){

    const routeLine = L.polyline([
        [pickup.lat, pickup.lng],
        [destination.lat, destination.lng]
    ],{
        color:"red",
        weight:5
    }).addTo(map);

    map.fitBounds(routeLine.getBounds());

}

window.AzTaxiNavigation = { drawFullRoute };
