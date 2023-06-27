const jwt = require("jsonwebtoken");
const EndUsers = require("../models/endusers");

const checkAuth = async (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) return res.status(401).json({ message: "Please login!" });

  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRECT_KEY);
    const userExists = await EndUsers.findOne({ id: user.id });
    if (userExists == null) {
      res.clearCookie("userToken");
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
    if (userExists && userExists.isVerified) {
      userExists.password = undefined;
      userExists.otp = undefined;
      userExists._id = undefined;
      userExists.__v = undefined;
      req.user = userExists;
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
      message: "Something went wrong!",
    });
  }
  next();
};

module.exports = checkAuth;
