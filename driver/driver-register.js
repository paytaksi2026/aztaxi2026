
async function registerDriver(data){
    const res = await fetch("/api/driver/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    const result = await res.json();
    if(result.success){
        alert("Qeydiyyat göndərildi. Admin təsdiqi gözlənilir.");
    }else{
        alert("Xəta baş verdi");
    }
}
