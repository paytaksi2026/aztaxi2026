
function pay(){

fetch("/api/pay",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
rideId:document.getElementById("ride").value,
amount:document.getElementById("amount").value,
method:document.getElementById("method").value
})
})
.then(r=>r.json())
.then(d=>{

alert("Payment success. Receipt created.");

})

}
