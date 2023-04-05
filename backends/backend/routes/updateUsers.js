const express = require("express");
const router = express.Router();
const usersadds = require("../models/addUsers")

router.patch("/updateusers/:id",async(req,resp)=>{
    try {
        const {id}=req.params;
        const updateUsers=await usersadds.findByIdAndUpdate(id,req.body,{
            new:true
        });
        resp.json({success:"User Updated",updateUsers})
    } catch (error) {
        console.log(error);
    }
});

module.exports=router;