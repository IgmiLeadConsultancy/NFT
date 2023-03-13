const express = require("express");
const router = express.Router();
const generalsettings = require("../models/GeneralSettingsModel");
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
const upLoadLogo = multer({ storage: Storage }).single("logo");

router.post("/Add-generalsetings", upLoadLogo, async (req, resp) => {
  // try {
  //     const generalsetingsData = new generalsettings({
  //         language: req.body.language,
  //         company_name: req.body.company_name,
  //         cpoyright_text: req.body.cpoyright_text,
  //         logo: req.file.filename,
  //     });
  //     const generalsetingsResult = await generalsetingsData.save();
  // } catch (error) {
  //     console.log(error)

  // }

  try {
    let generalsettingsData = await generalsettings.updateOne(
      { _id: "639f5ca0fc0ca604a47c45c8" },
      {
        $set: {
          language: req.body.language,
          company_name: req.body.company_name,
          cpoyright_text: req.body.cpoyright_text,
          logo: req.file.filename,
        },
      }
    );
    resp.json({success:"True",generalsettingsData})
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
