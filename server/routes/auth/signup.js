const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const EndUsers = require("../../models/endusers");
// const Vendors = require("../../models/vendors");

const { generateOTP } = require("../../services/otp");
const { sendOTP } = require("../../services/emailService");

router.get("/check-email", async (req, res) => {
  const { email } = req.query;
  try {
    if (!email.includes("null")) {
      const alreadyExists = await EndUsers.findOne({ email });
      // const alreadyExistsInVendors = await Vendors.findOne({ email });

      // if (alreadyExistsInVendors && !alreadyExistsInVendors.isVerified) {
      //   return res.status(200).json({ alreadyExists: true });
      // }

      if (alreadyExists && !alreadyExists.isVerified) {
        return res.status(200).json({ alreadyExists: true });
      }
    }
    return res.status(200).json({ alreadyExists: false });
  } catch (err) {
    console.log(err);
    return res.json(500).json({ err });
  }
});

router.post("/resend-email", async (req, res) => {
  const { email } = req.body;
  try {
    if (!email.includes("null")) {
      const alreadyExists = await EndUsers.findOne({ email });
      // const alreadyExistsInVendors = await Vendors.findOne({ email });

      // if (alreadyExistsInVendors) {
      //   const OTP = generateOTP();
      //   const emailRes = await sendOTP({ OTP, to: email });

      //   if (emailRes.rejected.length != 0)
      //     return res.status(500).json({
      //       message: "Something went wrong! Try Again",
      //     });
      //   await Vendors.updateOne({ email }, { $set: { otp: OTP } });
      //   return res.status(200).json({ success: true });
      // }

      if (alreadyExists) {
        const OTP = generateOTP();
        const emailRes = await sendOTP({ OTP, to: email });

        if (emailRes.rejected.length != 0)
          return res.status(500).json({
            message: "Something went wrong! Try Again",
          });
        await EndUsers.updateOne({ email }, { $set: { otp: OTP } });
        return res.status(200).json({ success: true });
      }
    }
    return res.status(200).json({ success: false, message: "Err!" });
  } catch (err) {
    console.log(err);
    return res.json(500).json({ err });
  }
});

router.post("/signup", async (req, res) => {
  const { id, email, mobile, name, password } = req.body;

  try {
    const alreadyExists = await EndUsers.findOne({ email });
    if (alreadyExists !== null) {
      return res
        .status(409)
        .json({ message: "Email Already Exists", success: false });
    }
    const OTP = generateOTP();
    const emailRes = await sendOTP({ OTP, to: email });

    if (emailRes.rejected.length != 0)
      return res.status(500).json({
        message: "Something went wrong! Try Again",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUsers = new EndUsers({
      email,
      fullName: name,
      id,
      mobile,
      otp: OTP,
      password: hashPassword,
    });

    await newUsers.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
