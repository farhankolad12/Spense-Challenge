const express = require("express");
const router = express.Router();

// Middlewares
const checkAuth = require("../../middlewares/checkAuth");

// Models
const Address = require("../../models/address");

router.get("/get-address", checkAuth, async (req, res) => {
  const currentUser = req.user;

  try {
    const address = await Address.findOne({ uid: currentUser.id });

    return res.status(200).json(address);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

router.get("/get-address-id", checkAuth, async (req, res) => {
  const { id } = req.query;
  const currentUser = req.user;

  try {
    const singleAddr = await Address.findOne({
      uid: currentUser.id,
      address: { $elemMatch: { id } },
    });

    if (singleAddr) {
      const data = await singleAddr.address.filter((addr) => {
        return addr.id === id;
      })[0];
      return res.status(200).json(data);
    }
    return res.status(200).json(undefined);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
