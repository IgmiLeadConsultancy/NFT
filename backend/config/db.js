const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
const db_con = mongoose.connect(
  "mongodb+srv://nft:nft@nft.v4inf5y.mongodb.net/?retryWrites=true&w=majority",
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
