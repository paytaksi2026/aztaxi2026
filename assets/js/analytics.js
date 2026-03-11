
document.getElementById("rides").innerText = Math.floor(Math.random()*1000);
document.getElementById("drivers").innerText = Math.floor(Math.random()*200);
document.getElementById("earnings").innerText = (Math.random()*5000).toFixed(2) + " AZN";
document.getElementById("rating").innerText = (4 + Math.random()).toFixed(2);

const ctx = document.getElementById("ridesChart");

new Chart(ctx,{
type:"line",
data:{
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[{
label:"Rides",
data:[12,19,8,15,22,30,18],
borderColor:"yellow",
fill:false
}]
}
});
