
let map = L.map('map').setView([40.4093,49.8671],13)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

function toggleOnline(){
 alert("Driver online")
}
