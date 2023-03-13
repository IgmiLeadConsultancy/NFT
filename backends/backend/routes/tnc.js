const express = require("express");
const router = express.Router();
const tncs = require("../models/tncmodel");

router.post("/TnC",async(req,resp)=>{
    // const tncData=new tncs({
    //     tnc:req.body.tnc,    
    // });
    // // console.log(AboutUsData);
    //  const tncResult=tncData.save((err,docs)=>{
    //     if(err){resp.json(err)}else(resp.json(docs))
    //  });
      
      try {
         let tncUpdate=await tncs.updateOne(
            {_id:"6374de5d50d40b3710162abe "},
            {$set:{tnc:req.body.tnc}}
         );
         resp.json({success:"Ok",tncUpdate})
      } catch (error) {
         resp.json(error)
      }

});

module.exports=router;