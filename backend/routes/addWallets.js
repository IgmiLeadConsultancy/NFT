const express = require("express");
const router = express.Router();
const wallets = require("../models/walletsModels");
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

const upLoadwalletImg=multer({storage:Storage}).single('wallet_image')


router.post("/Add-Wallets",upLoadwalletImg,async(req,resp)=>{
    
    try {
        const walletsData=new wallets({
            wallet_name:req.body.wallet_name,
            wallet_image:req.file.filename,
            
        });
         const walletsresult=await walletsData.save();
         resp.json({result:"Wallet Added Successfully",walletsresult});
    } catch (error) {
        resp.json(error);
        
    }
 
});


module.exports=router;