const express = require("express");
const router = express.Router();
const addusers = require("../models/addUsers");

const app = express();




router.post("/userAdding", async (req, resp) => {
  try {
    const userData = new addusers({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phn:   req.body.phn,
      pass: req.body.pass,
      role: req.body.role,
    });
    const AddUserResult =await userData.save();
    if (AddUserResult) {
      console.log(AddUserResult);


      let transporter=nodemaier.createTransport({
        service: 'gmail',
        auth:{
          user:'rickbhattacherjee@gmail.com',
          pass:"MAINAK@12345"
        }
        });

        let info=transporter.sendMail({
          from:'rickbhattacherjee@gmail.com',
          to:'mainak.bhattacharjee@igmifutech.com',
          subject:"Register Successfull",
          text:`Hi ${fname} &nbsp; ${lname} Your Unique  Is ${uuid}`
        });

    } else {
      console.log("Error Detected");
    }
    // console.log(req.body.lname);
  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;
