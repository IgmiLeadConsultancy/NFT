const mongoose=require('mongoose');
const EmailSettingsSchema=new mongoose.Schema({
    EmailHost:String,
    EmailPort:Number,
    EmailUsername:String,
    EmailPassword:String,
    MailEncryption:String,
    MailFormAddress:String,

    
});

const emails=new mongoose.model("emails",EmailSettingsSchema);
module.exports=emails;