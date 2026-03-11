
// admin-heatmap.js
// shows order heatmap on admin map

let heatPoints = [];

async function loadHeatmap(map){

    const res = await fetch("/api/admin/order-hotspots");
    const data = await res.json();

    heatPoints = data.map(p => [p.lat, p.lng, p.count]);

    if(window.heatLayer){
        map.removeLayer(window.heatLayer);
    }

    window.heatLayer = L.heatLayer(heatPoints, {
        radius: 25,
        blur: 15
    }).addTo(map);

}

setInterval(()=>loadHeatmap(window.adminMap),5000);
