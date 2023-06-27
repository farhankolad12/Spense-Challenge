const express = require("express");
const router = express.Router();

const Admins = require("../../models/admins");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const isExists = await Admins.findOne({ email });

    if (isExists && (await bcrypt.compare(password, isExists.password))) {
      isExists.password = undefined;
      const token = jwt.sign({ user: isExists }, process.env.JWT_SECRECT_KEY, {
        expiresIn: "1d",
      });
      const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        path: "/",
      };
      return res
        .status(200)
        .cookie("adminToken", token, options)
        .json({ success: true });
    }

    return res
      .status(409)
      .json({ success: false, message: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message, success: false });
  }
});

module.exports = router;
