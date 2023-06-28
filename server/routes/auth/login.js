const express = require("express");
const router = express.Router();

const EndUsers = require("../../models/endusers");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const isExists = await EndUsers.findOne({ email });

    if (isExists && (await bcrypt.compare(password, isExists.password))) {
      if (isExists.isVerified) {
        isExists.password = undefined;
        isExists.otp = undefined;
        const token = jwt.sign(
          { user: isExists },
          process.env.JWT_SECRECT_KEY,
          { expiresIn: "1d" }
        );
        const options = {
          expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          path: "/",
          secure: true,
          sameSite: "none"
        };
        return res
          .status(200)
          .cookie("userToken", token, options)
          .json({ success: true });
      }
      return res
        .status(409)
        .json({ navigation: "/otp-verify", message: "Email not verified" });
    }
    return res
      .status(409)
      .json({ success: false, message: "Invalid credentials" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

module.exports = router;
