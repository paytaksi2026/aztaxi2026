
const map = L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

for(let i=0;i<5;i++){
const lat = 40.40 + Math.random()*0.02;
const lng = 49.86 + Math.random()*0.02;
L.marker([lat,lng]).addTo(map);
}
