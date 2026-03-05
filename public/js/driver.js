
let map = L.map('map').setView([40.4093, 49.8671], 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

let orderKm = localStorage.getItem("order_km")
let orderPrice = localStorage.getItem("order_price")

if(orderKm){

document.getElementById("orderInfo").innerHTML =
"Mesafə: "+Number(orderKm).toFixed(2)+" km <br> Qiymət: "+Number(orderPrice).toFixed(2)+" AZN"

}

function acceptRide(){

alert("Ride başladı")

}
