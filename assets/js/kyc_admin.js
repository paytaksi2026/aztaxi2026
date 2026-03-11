
fetch("/api/kyc-list")
.then(r=>r.json())
.then(data=>{

const ul=document.getElementById("list");

data.forEach((d,i)=>{

const li=document.createElement("li");

li.innerHTML = d.name+" - "+d.status+
' <button onclick="approve('+i+')">Approve</button>';

ul.appendChild(li);

});

});

function approve(i){

fetch("/api/kyc-approve",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({index:i})
}).then(()=>location.reload());

}
