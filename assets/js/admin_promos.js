
fetch("/api/promos")
.then(r=>r.json())
.then(data=>{

const ul=document.getElementById("list");

data.forEach(p=>{
const li=document.createElement("li");
li.innerText=p.code+" - "+p.discount+"%";
ul.appendChild(li);
});

})
