
async function loginUser(phone){
    const res = await fetch("/api/auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({phone})
    });
    const data = await res.json();
    if(data.success){
        alert("Login uğurlu");
        localStorage.setItem("user", JSON.stringify(data.user));
    }else{
        alert("Login xətası");
    }
}
