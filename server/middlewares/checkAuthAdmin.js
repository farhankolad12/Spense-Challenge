const jwt = require("jsonwebtoken");
const Admins = require("../models/admins");

const checkAuthAdmin = async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) return res.status(401).json({ message: "Please login!" });

  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRECT_KEY);
    const userExists = await Admins.findOne({ id: user.id });
    if (userExists == null) {
      res.clearCookie("adminToken", {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        path: "/",
        secure: true,
        sameSite: "none"
      });
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
    userExists.password = undefined;
    userExists.__v = undefined;

    req.user = userExists;
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
      message: "Something went wrong!",
    });
  }
  next();
};

module.exports = checkAuthAdmin;
