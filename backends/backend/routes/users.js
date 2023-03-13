const router = require("express").Router();
const User = require("../models/addUsers");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET="nftseckey";


router.post("/register", async (req, res) => {
  const { fname, lname, email, password,ip,country_name,city_name,state } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      ip,
      country_name,
      city_name,
      state,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});




router.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});



router.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        JSON.stringify(data)
        res.send({ status: token, data: data, });
      })
      .catch((error) => {
        res.json({ status: "error", data: error });
      });
  } catch (error) {}
});

module.exports = router;
