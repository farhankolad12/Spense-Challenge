const Admins = require("../models/admins");

const checkAuthSuperAdmin = async (req, res, next) => {
  const currentUser = req.user;

  if (currentUser.type !== "admin")
    return res.status(409).json({ success: false, message: "Not allowed" });

  next();
};

module.exports = checkAuthSuperAdmin;
