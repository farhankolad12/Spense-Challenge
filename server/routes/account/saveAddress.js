const express = require("express");
const router = express.Router();

// Middlewares
const checkAuth = require("../../middlewares/checkAuth");

// Models
const Address = require("../../models/address");

router.post("/save-address", checkAuth, async (req, res) => {
  const currentUser = req.user;
  const { firstName, lastName, email, mobile, landMark, pincode, address, id } =
    req.body;

  try {
    const isExists = await Address.findOne({ uid: currentUser.id });

    if (isExists) {
      await Address.updateOne(
        { uid: currentUser.id },
        {
          $push: {
            address: {
              id,
              firstName,
              lastName,
              email,
              mobile,
              landMark,
              pincode,
              address,
            },
          },
        }
      );
      return res.status(200).json({ success: true });
    }

    await Address.create({
      address: [
        { firstName, lastName, email, mobile, landMark, pincode, address, id },
      ],
      uid: currentUser.id,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
