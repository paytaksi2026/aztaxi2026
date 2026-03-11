
function drawRoute(map,from,to){

    const line = L.polyline([
        [from.lat,from.lng],
        [to.lat,to.lng]
    ],{
        color:"blue",
        weight:4
    }).addTo(map);

    map.fitBounds(line.getBounds());

}
