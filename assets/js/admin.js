
fetch('/api/drivers-live')
.then(r=>r.json())
.then(d=>{
 document.getElementById("drivers").innerText=JSON.stringify(d,null,2)
})
