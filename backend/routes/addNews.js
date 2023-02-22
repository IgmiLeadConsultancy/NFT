const express = require("express");
const router = express.Router();
const news = require("../models/newsmodel");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../../FF/frontend/src/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upLoadnewsImg = multer({ storage: Storage }).single("news_thumbnail");

router.post("/Add-News", upLoadnewsImg, async (req, resp) => {
  try {
    const newsData = new news({
        news_title:req.body.news_title,
        news_desc:req.body.news_desc,
        news_thumbnail:req.file.filename,
    });
    // console.log(productsData);
    const newsResult = await newsData.save();
    console.log(newsResult);
  } catch (error) {
    resp.json(error);
  }
  
});

module.exports = router;
