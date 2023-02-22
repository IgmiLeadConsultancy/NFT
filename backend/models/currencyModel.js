const mongoose=require('mongoose');
const currrencieschema=new mongoose.Schema({
    currrency_name:String,
    currrency_image:{type:String},
   
});

const currrencies=new mongoose.model("currrencies",currrencieschema);
module.exports=currrencies;