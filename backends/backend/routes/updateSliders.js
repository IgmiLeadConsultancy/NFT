const express = require("express");
const router = express.Router();
const slider = require("../models/sliders");


const multer=require('multer');
const path=require('path');
const app= express();

app.use(express.static(path.join(__dirname, "public")));
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../../NFT/frontend/src/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upLoadProductImg = multer({ storage: Storage }).single("wallet_image");



router.patch("/updateSliders/:id",upLoadProductImg,async(req,resp)=>{
    try {
        const {id}=req.params;
        const updateProducts=await slider.findByIdAndUpdate(id,req.body,{
            new:true
        });
        resp.json({success:"Wallet Has Added Successfully",updateProducts});

    } catch (error) {
        console.log(error);
    }
});

module.exports=router;