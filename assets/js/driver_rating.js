
fetch("/api/driver-rating/driver1")
.then(r=>r.json())
.then(d=>{

document.getElementById("rating").innerText =
"Rating: "+d.rating+" ⭐ ("+d.rides+" rides)"

})
