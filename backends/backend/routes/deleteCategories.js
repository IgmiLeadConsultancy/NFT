const express = require("express");
const router = express.Router();
const categories = require("../models/categorymodel");

router.delete("/deleteCategory/:id",async(req,resp)=>{
    try {
        const {id}=req.params;
        const deleteCategory=await categories.findByIdAndDelete({_id:id})
        resp.json({success:"Category Deleted Successfullly",deleteCategory});
    } catch (error) {
        console.log(error);
    }
});

module.exports=router;