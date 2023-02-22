const mongoose=require('mongoose');
const AdminPolicySchema=new mongoose.Schema({
    adminPolicy:String,
   
});

const adminpolicies=new mongoose.model("adminpolicies",AdminPolicySchema);
module.exports=adminpolicies;