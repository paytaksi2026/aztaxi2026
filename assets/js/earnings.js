
fetch("/api/earnings")
.then(r=>r.json())
.then(d=>{
document.getElementById("earnings").innerText=d.earnings+" AZN";
})
