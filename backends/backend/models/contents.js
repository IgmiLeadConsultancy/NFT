const mongoose=require('mongoose');
const ContentsSchema=new mongoose.Schema({
    TitleFp:String,
    ContentFp:String,
    TitleLts:String,
    ContentLts:String,
    TitleExp:String,
    ContentExp:String,
    TitleFooter:String,
    ContentFooter:String,
  

    
});

const contents=new mongoose.model("contents",ContentsSchema);
module.exports=contents;