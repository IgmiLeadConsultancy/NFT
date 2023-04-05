const mongoose=require('mongoose');
const FAQSchema=new mongoose.Schema({
    question:String,
    answer:String,
   
});

const faqs=new mongoose.model("faqs",FAQSchema);
module.exports=faqs;