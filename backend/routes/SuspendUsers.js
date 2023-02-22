const express = require("express");
const router = express.Router();
const usersadds = require("../models/addUsers");



router.patch("/suspendusers/:id",async(req,resp)=>{
    try {
        const {id}=req.params;
        const suspendusers=await usersadds.findByIdAndUpdate(
            {_id:id},
            {$set:{status:"Deactive"}}
        );
        // console.log(suspendusers);
        resp.json({status:"User Suspended Successfully"});
    } 

    
    catch (error) {
        console.log(error);
    }
});

module.exports=router;