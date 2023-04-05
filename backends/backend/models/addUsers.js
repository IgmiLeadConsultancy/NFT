const mongoose=require('mongoose');
const { v4: uuidv4 } = require("uuid");
const uniqueId = uuidv4();
const authUsersSchema=new mongoose.Schema({
    fname: { type: String,required:true },
    lname: { type: String,required:true },
    email: { type: String,required:true,unique:true },
    password: { type: String,required:true },
    ip:{type: String,},
    country_name:{type: String,},
    city_name:{type: String,},
    state:{type: String},
    status:{type:String,default:"Active"},
    createdAt:{type:Date,default:Date.now()},  
    uuid:{type:String,default:uniqueId} 
});
const authusers=new mongoose.model("authusers",authUsersSchema);




module.exports=authusers;