
// driver-push.js
async function checkRideAlerts(){
    try{
        const res = await fetch("/api/driver/alerts");
        const data = await res.json();

        data.forEach(a=>{
            alert("Yeni sifariş: " + a.message);
        });

    }catch(e){
        console.log("alert error",e);
    }
}

setInterval(checkRideAlerts,4000);
