
// passenger-destination.js
// choose destination on map

function selectDestination(map){

    map.on("click", function(e){

        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        const marker = L.marker([lat,lng]).addTo(map);

        alert("Destination seçildi");

        window.selectedDestination = {lat,lng};

    });

}

window.AzTaxiDestination = { selectDestination };
