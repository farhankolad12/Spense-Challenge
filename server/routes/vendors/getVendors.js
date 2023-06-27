const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

const Vendors = require("../../models/admins");

router.get("/get-vendors", async (req, res) => {
  try {
    const data = await Vendors.find(
      { type: "vendor" },
      {
        password: 0,
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-vendor-id", async (req, res) => {
  const { id } = req.query;

  try {
    const data = await Vendors.findOne(
      { id, type: "vendor" },
      {
        password: 0,
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
