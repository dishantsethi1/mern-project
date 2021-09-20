const jwt = require("jsonwebtoken");
const { User } = require("../model/userSchema");
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    if (!token) return res.sendStatus(401);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.UserID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send("unauthorized");
    console.log(err);
  }
};
module.exports = authenticate;
