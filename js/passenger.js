
let map = L.map('map').setView([40.4093, 49.8671], 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

let marker

map.on('click', function(e){

if(marker){
map.removeLayer(marker)
}

marker = L.marker(e.latlng).addTo(map)

})

function calculatePrice(km){

if(km<=3){
return 3.5
}

return 3.5 + ((km-3)*0.30)

}

function createOrder(){

let km = Math.random()*10

let price = calculatePrice(km)

document.getElementById("distance").innerHTML = "Mesafə: "+km.toFixed(2)+" km"

document.getElementById("price").innerHTML = "Qiymət: "+price.toFixed(2)+" AZN"

localStorage.setItem("order_km",km)
localStorage.setItem("order_price",price)

alert("Driver axtarılır...")

}
