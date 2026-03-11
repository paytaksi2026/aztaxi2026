async function loadStats(){

    try{
        const res = await fetch("/api/admin/stats");
        const data = await res.json();

        document.getElementById("activeDrivers").innerText = data.activeDrivers;
        document.getElementById("todayOrders").innerText = data.orders;
        document.getElementById("todayRevenue").innerText = data.revenue + " AZN";

    }catch(e){
        console.log("Stats error",e);
    }
}

setInterval(loadStats,5000);
loadStats();
