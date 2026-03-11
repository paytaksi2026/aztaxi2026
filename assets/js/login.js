
function login(){

fetch("/api/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
phone:document.getElementById("phone").value,
password:document.getElementById("pass").value
})
})
.then(r=>r.json())
.then(d=>{

if(d.ok) alert("Login success")
else alert("Login failed")

})

}
