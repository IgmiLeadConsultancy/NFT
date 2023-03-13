const express = require("express");
const router = express.Router();
const sliders=require("../models/sliders")

router.delete("/deletesliders/:id",async(req,resp)=>{
    try {
        const {id}=req.params;
        const deletearts=await sliders.findByIdAndDelete({_id:id})
        resp.json({success:"Slider Images Has Been Deleted Successfully",deletearts});

    } catch (error) {
        console.log(error);
    }
});

module.exports=router;