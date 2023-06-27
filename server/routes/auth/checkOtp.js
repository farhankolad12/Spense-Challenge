const express = require("express");
const router = express.Router();

// Models
const EndUsers = require("../../models/endusers");
// const Vendors = require("../../models/vendors");

router.post("/check-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const isExists = await EndUsers.findOne({ email });
    // const isExistsInVendors = await Vendors.findOne({ email });

    // if (isExistsInVendors && isExistsInVendors.otp === +otp) {
    //   await Vendors.updateOne({ email }, { $set: { isVerified: true } });
    //   return res.status(200).json({ success: true });
    // }

    if (isExists && isExists.otp === +otp) {
      await EndUsers.updateOne({ email }, { $set: { isVerified: true } });
      return res.status(200).json({ success: true });
    }

    return res.status(409).json({ success: false, message: "Invalid Otp!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
