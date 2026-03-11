
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());

let payments = [];

app.post("/api/pay",(req,res)=>{

const {rideId,amount,method} = req.body;

const payment = {
rideId,
amount,
method,
time:Date.now()
};

payments.push(payment);

const receipt = `
Ride: ${rideId}
Amount: ${amount} AZN
Method: ${method}
Time: ${new Date().toISOString()}
`;

const file = path.join(__dirname,"../receipts/ride_"+rideId+".txt");

fs.writeFileSync(file,receipt);

res.json({ok:true});

});

app.get("/api/payments",(req,res)=>res.json(payments));

app.listen(3000,()=>console.log("Payment module running"));
