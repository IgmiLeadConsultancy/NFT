const express = require("express");
const router = express.Router();
const categories = require("../models/categorymodel");


// const multer=require('multer');
// const path=require('path');
// const app= express();

// app.use(express.static(path.join(__dirname,'public')))
// const Storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//      cb(null,"../../FF/frontend/src/uploads")
//     },
//     filename:(req,file,cb)=>{
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//     }
// });
// const upLoadCategoryImg=multer({storage:Storage}).single('category_image')



router.patch("/updateCategories/:id",async(req,resp)=>{
    try {
        const {id}=req.params;
        const updateCategories=await categories.findByIdAndUpdate(id,req.body,{
            new:true
        });
       resp.json({success:"Category Updated Successfully",updateCategories});
    } catch (error) {
        console.log(error);
    }
});

module.exports=router;