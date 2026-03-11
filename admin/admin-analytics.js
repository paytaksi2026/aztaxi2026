
// admin-analytics.js
// simple analytics stats for admin panel

async function loadAnalytics(){

    try{

        const res = await fetch("/api/admin/analytics");
        const data = await res.json();

        document.getElementById("ridesToday").innerText = data.ridesToday;
        document.getElementById("revenueToday").innerText = data.revenueToday + " AZN";
        document.getElementById("activeDrivers").innerText = data.activeDrivers;

    }catch(e){
        console.log("analytics error",e);
    }

}

setInterval(loadAnalytics,5000);
loadAnalytics();
