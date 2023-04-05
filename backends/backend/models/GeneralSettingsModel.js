const mongoose =require('mongoose');
const GeneralSettingsSchema=new mongoose.Schema({
    language:{type:String},
    company_name:{type:String},
    cpoyright_text:{type:String},
    logo:{type:String},

});

const generalsettings=mongoose.model("generalsettings",GeneralSettingsSchema);
module.exports=generalsettings;