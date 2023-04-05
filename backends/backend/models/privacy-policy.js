const mongoose=require('mongoose');
const privacySchema=new mongoose.Schema({
    privacyPolicy:String,
   
});

const privacypolicies=new mongoose.model("privacypolicies",privacySchema);
module.exports=privacypolicies;