const express = require("express");
const router = express.Router();
const usersadds = require("../models/addUsers");


router.patch("/activeusers/:id",async(req,resp)=>{
    try {
        const {id}=req.params;
        const activeusers=await usersadds.findByIdAndUpdate(
            {_id:id},
            {$set:{status:"Active"}}
        );
        resp.json({activeusers:"User Activated Successfully",activeusers})
    } catch (error) {
        console.log(error);
    }
});

module.exports=router;