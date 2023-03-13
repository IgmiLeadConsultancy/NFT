const express = require("express");
const router = express.Router();
const currencies=require("../models/currencyModel")

router.delete("/deletecurrency/:id",async(req,resp)=>{
    try {
        const {id}=req.params;
        const deletearts=await currencies.findByIdAndDelete({_id:id})
        resp.json({success:"Currency Has Deleted Successfully",deletearts});

    } catch (error) {
        console.log(error);
    }
});

module.exports=router;