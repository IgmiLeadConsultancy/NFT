const express = require("express");
const router = express.Router();
const about_us = require("../models/aboutUs");

router.post("/AboutUs",async(req,resp)=>{
    // const AboutUsData=new about_us({
    //     aboutUs:req.body.aboutUs,    
    // });
    // // console.log(AboutUsData);
    //  const AboutUsResult=AboutUsData.save((err,docs)=>{
    //     if(err){resp.json(err)}else(resp.json(docs))
    //  });

      try {
        let about_usUpdate=await about_us.updateOne(
          {_id:"6374d81ce2ce18110caa0281"},
          {$set:{aboutUs:req.body.aboutUs}}
        );
        resp.json({status:"Ok",about_usUpdate})
      } catch (error) {
        resp.json(error)
      }
});

module.exports=router;