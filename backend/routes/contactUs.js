const express = require("express");
const router = express.Router();
const contactus = require("../models/contactUs.Js");

router.post("/ContactUs",async(req,resp)=>{
    // const ContactUsData=new contactus({
    //     contactUs:req.body.contactUs,    
    // });
    // // console.log(AboutUsData);
    //  const ContactUsResult=ContactUsData.save((err,docs)=>{
    //     if(err){resp.json(err)}else(resp.json(docs))
    //  });
 
       try {
        let contactUsUpdate=await contactus.updateOne(
            {_id:"6374dc352d4b541e189da4b1"},
            {$set:{contactUs:req.body.contactUs}}
        );
        resp.json({status:"Ok",contactUsUpdate})
       } catch (error) {
        resp.json(error)
        
       }
});

module.exports=router;