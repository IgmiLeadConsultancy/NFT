const express = require("express");
const router = express.Router();
const usersadds = require("../models/addUsers");


router.patch("/activateEmail/:id",async(req,resp)=>{
    try {
        const {id}=req.params;
        const activateEmail=await usersadds.findByIdAndUpdate(
            {_id:id},
            {$set:{
                EmailPending
                :"Active"}}
        );
        console.log(activateEmail);
    } catch (error) {
        console.log(error);
    }
});

module.exports=router;