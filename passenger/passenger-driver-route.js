
// passenger-driver-route.js
// draw route from driver to passenger

function drawDriverRoute(map,driver,pickup){

    const line = L.polyline([
        [driver.lat,driver.lng],
        [pickup.lat,pickup.lng]
    ],{
        color:"blue",
        weight:5
    }).addTo(map);

    map.fitBounds(line.getBounds());

}
