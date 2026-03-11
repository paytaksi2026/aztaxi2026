
// driver-live-location.js
// driver sends GPS location to server

function startDriverLocation(){

    if(!navigator.geolocation){
        alert("GPS dəstəklənmir");
        return;
    }

    setInterval(()=>{

        navigator.geolocation.getCurrentPosition(pos=>{

            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            fetch("/api/driver/location",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({lat,lng})
            });

        });

    },3000);

}
