const express = require("express");
const router = express.Router();
const ownNfts = require("../models/addOwnProduct");
const multer = require("multer");
const path = require("path");
const app = express();

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

const upLoadProductImg = multer({ storage: Storage }).single("collectionsImg");

router.post("/Add-Own-NFT", upLoadProductImg, async (req, resp) => {
    try {
        const productsData = new ownNfts({
            collection_title: req.body.collection_title,
            artCollectionss_name: req.body.artCollectionss_name,
            artCollectionss_short_desc: req.body.artCollectionss_short_desc,
            artCollectionss_category: req.body.artCollectionss_category,
            artCollectionss_price: req.body.artCollectionss_price,
            collectionsImg: req.file.filename,
            user: req.body.user,
        });
        const Productresult = await productsData.save();
        resp.json({ success: "Arts Collection Has Added Successfully", Productresult });
    } catch (error) {
        console.log(error);
    }
});


router.post("/Sell-Own-NFT", upLoadProductImg, async (req, resp) => {
    try {
        const productsData = new ownNfts({
            collection_title: req.body.collection_title,
            artCollectionss_name: req.body.artCollectionss_name,
            artCollectionss_short_desc: req.body.artCollectionss_short_desc,
            artCollectionss_category: req.body.artCollectionss_category,
            artCollectionss_price: req.body.artCollectionss_price,
            collectionsImg: req.file.filename,
            user: req.body.user,
            contractAddress: req.body.contractAddress,
        });
        const Productresult = await productsData.save();
        resp.json({ success: "Arts Collection Has Added Successfully", Productresult });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
