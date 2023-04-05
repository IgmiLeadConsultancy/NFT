const express = require("express");
const faqs = require("../models/faq");
const router = express.Router();

router.post("/FAQS",async(req,resp)=>{
    const FAQsData=new faqs({
        question:req.body.question,    
        answer:req.body.answer,    
    });
     const FAQSResult=FAQsData.save((err,docs)=>{
        if(err){resp.json(err)}else(resp.json(docs))
     });
     
});

module.exports=router;