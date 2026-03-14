
async function registerCustomer(){

const data={
phone:document.getElementById("c_phone").value,
password:document.getElementById("c_password").value,
name:document.getElementById("c_name").value,
surname:document.getElementById("c_surname").value
}

await fetch("/api/register_customer",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
})

alert("Müştəri qeydiyyatı tamamlandı")

}

async function registerDriver(){

const data={
phone:document.getElementById("d_phone").value,
password:document.getElementById("d_password").value,
name:document.getElementById("d_name").value,
surname:document.getElementById("d_surname").value,
car_brand:document.getElementById("car_brand").value,
car_model:document.getElementById("car_model").value,
car_number:document.getElementById("car_number").value,
car_color:document.getElementById("car_color").value
}

await fetch("/api/register_driver",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
})

alert("Sürücü qeydiyyatı tamamlandı")

}
