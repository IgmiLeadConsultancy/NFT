const express = require("express");
const router = express.Router();
const currencies = require("../models/currencyModel");
const multer=require('multer');
const path=require('path');

const app=express();


 


app.use(express.static(path.join(__dirname,'public')))
const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,"../../../NFT/frontend/src/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upLoadwalletImg=multer({storage:Storage}).single('currrency_image')


router.post("/Add-Currencies",upLoadwalletImg,async(req,resp)=>{
    
    try {
        const currenciesData=new currencies({
            currrency_name:req.body.currrency_name,
            currrency_image:req.file.filename,
            
        });
         const currenciesresult=await currenciesData.save();
         resp.json({result:"Currency Added Successfully",currenciesresult});
    } catch (error) {
        resp.json(error);
        
    }
 
});


module.exports=router;