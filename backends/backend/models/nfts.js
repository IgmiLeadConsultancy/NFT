const mongoose=require('mongoose');
const NFTSettingsSchema=new mongoose.Schema({
    MoralisServerURL:String,
    MoralisApplicationID:String,
    ContractAddress:String,
    AdminAddress:String,
    Fee:Number,
    Chain:String,
    ExplorerURL:String,

    
});

const nfts=new mongoose.model("nfts",NFTSettingsSchema);
module.exports=nfts;