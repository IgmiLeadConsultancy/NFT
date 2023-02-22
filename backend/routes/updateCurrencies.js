const express = require("express");
const router = express.Router();
const currencies = require("../models/currencyModel");


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

const upLoadProductImg = multer({ storage: Storage }).single("currrency_image");



router.patch("/updatecurrencies/:id",upLoadProductImg,async(req,resp)=>{
    try {
        const {id}=req.params;
        const updatecurrencies=await currencies.findByIdAndUpdate(id,req.body,{
            new:true
        });
        resp.json({success:"Currency Has Added Successfully",updatecurrencies});

    } catch (error) {
        console.log(error);
    }
});

module.exports=router;