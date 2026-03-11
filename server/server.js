
const express = require("express");
const app = express();

app.use(express.json());

let promos = [
{code:"AZTAXI10",discount:10},
{code:"FIRSTRIDE",discount:20}
];

app.post("/api/apply-promo",(req,res)=>{

const {code,price} = req.body;

const p = promos.find(x=>x.code===code);

if(!p) return res.json({ok:false});

const discount = price * (p.discount/100);
const finalPrice = price - discount;

res.json({
ok:true,
discount:p.discount,
finalPrice:finalPrice.toFixed(2)
});

});

app.get("/api/promos",(req,res)=>res.json(promos));

app.listen(3000,()=>console.log("Promo system running"));
