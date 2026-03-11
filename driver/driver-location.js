// Sends driver GPS location to server every 3 seconds
function startDriverLocation() {
    if (!navigator.geolocation) {
        alert("GPS not supported");
        return;
    }

    setInterval(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const data = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            };

            fetch("/api/driver-location", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(data)
            });
        });
    }, 3000);
}

startDriverLocation();
