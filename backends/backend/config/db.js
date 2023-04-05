const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
const dotenv = require("dotenv").config();
const db_con = mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log("Connection Error:" + err);
    } else {
      console.log("Connection success!");
    }
  }
);

module.exports = db_con;
