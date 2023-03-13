const express = require("express");
const router = express.Router();
const arts = require("../models/productmodel");


const multer=require('multer');
const path=require('path');
const app= express();

app.use(express.static(path.join(__dirname, "public")));
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../../FF/frontend/src/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upLoadProductImg = multer({ storage: Storage }).single("collectionsImg");



router.patch("/updateproducts/:id",upLoadProductImg,async(req,resp)=>{
    try {
        const {id}=req.params;
        const updateProducts=await arts.findByIdAndUpdate(id,req.body,{
            new:true
        });
        resp.json({success:"Arts Collection Has Added Successfully",updateProducts});

    } catch (error) {
        console.log(error);
    }
});

module.exports=router;