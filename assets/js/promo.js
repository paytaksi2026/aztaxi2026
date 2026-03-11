
function apply(){

fetch("/api/apply-promo",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
code:document.getElementById("code").value,
price:Number(document.getElementById("price").value)
})
})
.then(r=>r.json())
.then(d=>{

if(!d.ok){
document.getElementById("result").innerText="Invalid code";
}else{
document.getElementById("result").innerText=
"Discount: "+d.discount+"% | Final price: "+d.finalPrice+" AZN";
}

})

}
