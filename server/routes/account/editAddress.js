const express = require("express");
const router = express.Router();

// Middlewares
const checkAuth = require("../../middlewares/checkAuth");

// Models
const Address = require("../../models/address");

router.post("/edit-address", checkAuth, async (req, res) => {
  const currentUser = req.user;
  const { firstName, lastName, email, mobile, landMark, pincode, address, id } =
    req.body;

  try {
    const isExists = await Address.findOne({ uid: currentUser.id });

    if (isExists) {
      const newAddress = isExists.address.filter((addr) => {
        return addr.id !== id;
      });
      newAddress.push({
        id,
        firstName,
        lastName,
        email,
        mobile,
        landMark,
        pincode,
        address,
      });
      await Address.updateOne(
        { uid: currentUser.id },
        { $set: { address: newAddress } }
      );
      return res.status(200).json({ success: true });
    }
  } catch (err) {}
});

module.exports = router;
