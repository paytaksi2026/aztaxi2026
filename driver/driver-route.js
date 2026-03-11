
function drawDriverRoute(map,from,to){

    const line = L.polyline([
        [from.lat,from.lng],
        [to.lat,to.lng]
    ],{
        color:"green",
        weight:4
    }).addTo(map);

    map.fitBounds(line.getBounds());

}
