const mongoose=require('mongoose');
const walletSchema=new mongoose.Schema({
    wallet_name:String,
    wallet_image:{type:String},
   
});

const wallets=new mongoose.model("wallets",walletSchema);
module.exports=wallets;