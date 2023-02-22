const mongoose=require('mongoose');
const tncSchema=new mongoose.Schema({
    tnc:String,
   
});

const tncs=new mongoose.model("tncs",tncSchema);
module.exports=tncs;