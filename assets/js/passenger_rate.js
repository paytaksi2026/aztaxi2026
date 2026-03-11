
function rate(stars){

fetch("/api/rate-driver",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
driverId:"driver1",
stars:stars
})
})

alert("Thanks for rating")

}
