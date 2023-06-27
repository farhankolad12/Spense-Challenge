const express = require("express");
const router = express.Router();

const checkAuth = require("../../middlewares/checkAuth");

const Cart = require("../../models/cart");

router.post("/delete-cart", checkAuth, async (req, res) => {
  const { id } = req.body;

  try {
    await Cart.deleteOne({ id });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
