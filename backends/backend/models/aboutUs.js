const mongoose=require('mongoose');
const aboutUsSchema=new mongoose.Schema({
    aboutUs:String,
   
});

const about_us=new mongoose.model("about_us",aboutUsSchema);
module.exports=about_us;