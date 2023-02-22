const express=require('express');
const router=express.Router();
const products=require('../models/productmodel');

router.get("/Fetch-Products",async(req,resp)=>{
    const fetchProductData=await products.find();
});

module.export=router;