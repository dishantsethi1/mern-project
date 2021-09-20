const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware.js/authenticate");

const { User, Contact } = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("hi from router middleware");
});

router.post("/register", async (req, res) => {
  //   console.log(req.body);
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "please fill the data fully" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(422).json({ message: "alreday present" });
    } else if (password != cpassword) {
      return res.status(422).json({ message: "password not same" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();

      res.status(201).json({ message: "user registered " });
    }
  } catch (err) {
    console.log("form register");
    console.log({ err });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  //console.log({ email, password });
  if (!email || !password)
    return res.status(422).json({ error: "plz fill full" });

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);

      const token = await userExist.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });

      if (isMatch) {
        res.json({ message: "user signin done " });
      } else {
        return res.status(422).json({ err: "invlaid credentials" });
      }
    } else {
      return res.status(422).json({ error: "not found" });
    }
  } catch (err) {
    console.log("from login");
    console.log(err);
  }
});

router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const con = new Contact({ name, email, phone, message });

    await con.save();
    res.status(201).json({ message: "sent" });
  } catch (err) {
    console.log("contact server");
    console.log(err);
  }
});
router.get("/about", authenticate, (req, res) => {
  return res.send(req.rootUser);
});

router.get("/getdata", authenticate, (req, res) => {
  return res.send(req.rootUser);
});
router.get("/logout", authenticate, (req, res) => {
  res.clearCookie("jwtoken", {
    path: "/",
  });
  res.status(200).send("done sir ji");
});
module.exports = router;
