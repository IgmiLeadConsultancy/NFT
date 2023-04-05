const express = require("express");
const router = express.Router();
const wallets=require("../models/walletsModels")

router.delete("/deleteWallets/:id",async(req,resp)=>{
    try {
        const {id}=req.params;
        const deletearts=await wallets.findByIdAndDelete({_id:id})
        resp.json({success:"Wallet Has Added Successfully",deletearts});

    } catch (error) {
        console.log(error);
    }
});

module.exports=router;