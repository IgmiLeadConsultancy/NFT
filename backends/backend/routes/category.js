const express = require("express");
const router = express.Router();
const categories = require("../models/categorymodel");
const multer=require('multer');
const path=require('path');

const app=express();


 


app.use(express.static(path.join(__dirname,'public')))
const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,"../../../FF/frontend/src/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upLoadCategoryImg=multer({storage:Storage}).single('category_image')


router.post("/Add-Categories",upLoadCategoryImg,async(req,resp)=>{
    
    try {
        const categoriesData=new categories({
            category_name:req.body.category_name,
            category_image:req.file.filename,
            category_title:req.body.category_title,
            category_desc:req.body.category_desc,        
        });
         const Categoriesresult=await categoriesData.save();
         resp.json({result:"Category Added Successfully",Categoriesresult});
    } catch (error) {
        resp.json(error);
        
    }
 
});


module.exports=router;