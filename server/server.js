
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(express.json());

let drivers = [];

app.post("/api/driver-kyc", upload.single("document"), (req,res)=>{

const driver = {
name:req.body.name,
car:req.body.car,
doc:req.file.filename,
status:"PENDING"
};

drivers.push(driver);

res.json({ok:true});

});

app.get("/api/kyc-list",(req,res)=>res.json(drivers));

app.post("/api/kyc-approve",(req,res)=>{

const d = drivers[req.body.index];
if(d) d.status="APPROVED";

res.json({ok:true});

});

app.listen(3000,()=>console.log("KYC module running"));
