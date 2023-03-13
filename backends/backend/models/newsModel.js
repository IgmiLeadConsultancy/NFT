const mongoose=require('mongoose');
const newsSchema=new mongoose.Schema({
    news_title:String,
    news_title:String,
    news_thumbnail:String,
    news_createdAt:{
        type: Date,
        default: Date.now()
    },
   
});

const news=mongoose.models.news  || mongoose.model("news",newsSchema);
module.exports=news;