const mongoose=require('mongoose');
const SlidersSchema=new mongoose.Schema({
    slider_img:String,
    

    
});

const sliders=new mongoose.model("sliders",SlidersSchema);
module.exports=sliders;