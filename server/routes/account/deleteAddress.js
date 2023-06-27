const express = require("express");
const router = express.Router();

// Middlewares
const checkAuth = require("../../middlewares/checkAuth");

// Models
const Address = require("../../models/address");

router.post("/delete-address", checkAuth, async (req, res) => {
  const currentUser = req.user;
  const { id } = req.body;

  try {
    const address = await Address.findOne({ uid: currentUser.id });

    if (address) {
      const newAddress = address.address.filter((addr) => addr.id !== id);
      await Address.updateOne(
        { uid: currentUser.id },
        { $set: { address: newAddress } }
      );
      return res.status(200).json({ success: true });
    }
    return res
      .status(409)
      .json({ success: false, message: "Address not found!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
