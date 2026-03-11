
const express = require("express");
const app = express();

app.use(express.json());

let ratings = [];
let driverStats = {};

app.post("/api/rate-driver",(req,res)=>{

const {driverId,stars} = req.body;

ratings.push({driverId,stars});

if(!driverStats[driverId]){
driverStats[driverId] = {total:0,count:0};
}

driverStats[driverId].total += stars;
driverStats[driverId].count += 1;

res.json({ok:true});

});

app.get("/api/driver-rating/:id",(req,res)=>{

const s = driverStats[req.params.id];

if(!s) return res.json({rating:0});

res.json({
rating:(s.total/s.count).toFixed(2),
rides:s.count
});

});

app.listen(3000,()=>console.log("Rating system running"));
