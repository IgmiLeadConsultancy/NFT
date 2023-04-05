const express = require("express");
const router = express.Router();
const contents = require("../models/contents");

router.post("/CONTENTS",async(req,resp)=>{
    // const contentsData=new contents({
    //     TitleFp:req.body.TitleFp,
    //     ContentFp:req.body.ContentFp,
    //     TitleLts:req.body.TitleLts,
    //     ContentLts:req.body.ContentLts,
    //     TitleExp:req.body.TitleExp,
    //     ContentExp:req.body.ContentExp,
    //     TitleFooter:req.body.TitleFooter,
    //     ContentFooter:req.body.ContentFooter,
    // });
    // // console.log(contentsData);
    //  const contentsResult=contentsData.save((err,docs)=>{
    //     if(err){resp.json(err)}else(resp.json(docs))
    //  });

      try {
        let ContentsUpdate=await contents.updateOne(
          {_id:"638cf9257ca43208d4f53b0b"},
          {$set:{TitleFp:req.body.TitleFp,
        ContentFp:req.body.ContentFp,
        TitleLts:req.body.TitleLts,
        ContentLts:req.body.ContentLts,
        TitleExp:req.body.TitleExp,
        ContentExp:req.body.ContentExp,
        TitleFooter:req.body.TitleFooter,
        ContentFooter:req.body.ContentFooter,}}
        );
        resp.json({status:"Ok",ContentsUpdate})
      } catch (error) {
        resp.json(error)
      }
});

module.exports=router;