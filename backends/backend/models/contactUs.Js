const mongoose=require('mongoose');
const contactUsSchema=new mongoose.Schema({
    contactUs:String,
   
});

const contactus=new mongoose.model("contactus",contactUsSchema);
module.exports=contactus;