
async function checkNotifications(){

    try{

        const res = await fetch("/api/driver/notifications");
        const list = await res.json();

        list.forEach(n=>{
            alert("Bildiriş: "+n.message);
        });

    }catch(e){
        console.log(e);
    }

}

setInterval(checkNotifications,5000);
