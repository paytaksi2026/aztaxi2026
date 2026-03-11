
fetch("/api/rides")
.then(r=>r.json())
.then(data=>{

const ul=document.getElementById("rides");

data.forEach(r=>{
const li=document.createElement("li");
li.innerText="Ride "+r.id+" - "+r.price+" AZN";
ul.appendChild(li);
});

})
