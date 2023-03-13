const express = require("express");
const router = express.Router();
const sliders = require("../models/sliders");


const multer=require('multer');
const path=require('path');
const app= express();


app.use(express.static(path.join(__dirname, "public")));
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../../NFT/frontend/src/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upLoadProductImg = multer({ storage: Storage }).single("slider_img");






router.post("/SLIDERS",upLoadProductImg, async (req, resp) => {
  const slidersData=new sliders({
    slider_img:req.file.filename,
  });
  // console.log(slidersData);
   const slidersResult=slidersData.save((err,docs)=>{
      if(err){resp.json(err)}else(resp.json(docs))
   });

  // try {
  //   let slidersUpdate = await sliders.updateOne(
  //     { _id: "638cf44bd1913c07c4fcba5b" },
  //     {
  //       $set: {
  //         ShortDescription: req.body.ShortDescription,
  //         LongDescriptionHead: req.body.LongDescriptionHead,
  //         LongDescriptionMiddle: req.body.LongDescriptionMiddle,
  //         LongDescriptionFooter: req.body.LongDescriptionFooter,
  //       },
  //     }
  //   );
  //   resp.json({status:"Ok",slidersUpdate});
  // } catch (error) {
  //   resp.json(error);
  // }
});

module.exports = router;
