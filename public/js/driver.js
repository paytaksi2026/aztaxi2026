
const socket = io()

let map = L.map("map").setView([40.4093,49.8671],13)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

navigator.geolocation.watchPosition((pos)=>{

let lat = pos.coords.latitude
let lng = pos.coords.longitude

socket.emit("driver-location",{lat,lng})

})
