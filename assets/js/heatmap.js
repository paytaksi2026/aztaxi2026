
// Demo demand points (simulate many ride requests)
const demandPoints = [
[40.4093,49.8671,0.9],
[40.4100,49.8650,0.7],
[40.4080,49.8700,0.8],
[40.4120,49.8680,0.6],
[40.4065,49.8660,0.5],
[40.4070,49.8720,0.9],
[40.4110,49.8690,0.8],
[40.4130,49.8640,0.6]
];

const map = L.map('map').setView([40.4093,49.8671], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19
}).addTo(map);

// Create heat layer
const heat = L.heatLayer(demandPoints, {
radius: 35,
blur: 25,
maxZoom: 17
}).addTo(map);
