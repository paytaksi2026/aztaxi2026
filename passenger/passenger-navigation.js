
// passenger-navigation.js
function openWaze(lat,lng){
    const url = "https://waze.com/ul?ll=" + lat + "," + lng + "&navigate=yes";
    window.open(url,"_blank");
}

function openGoogleMaps(lat,lng){
    const url = "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lng;
    window.open(url,"_blank");
}

window.AzTaxiNav={
    openWaze,
    openGoogleMaps
};
