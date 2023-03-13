const mongoose=require('mongoose');
const CategorySchema=new mongoose.Schema({
    category_name:String,
    category_image:{type:String},
    category_title:String,
    category_desc:String,
   
});

const categories=new mongoose.model("categories",CategorySchema);
module.exports=categories;