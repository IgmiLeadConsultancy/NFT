const express = require("express");
const router = express.Router();
const usersadds = require("../models/addUsers");


router.delete("/deleteusers/:id",async(req,resp)=>{
    try {
        const {id}=req.params;
        const deleteusers=await usersadds.findByIdAndDelete({_id:id})
        resp.json({success:"User Deleted Successfully",deleteusers});
    } catch (error) {
        console.log(error);
    }
});

module.exports=router;