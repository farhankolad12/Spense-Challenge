const express = require("express");
const router = express.Router();

const checkAuth = require("../../middlewares/checkAuth");

const Cart = require("../../models/cart");

router.post("/add-cart", checkAuth, async (req, res) => {
  const currentUser = req.user;
  const { id, cartId, selectedVariationId } = req.body;

  try {
    const isExists = await Cart.findOne({
      uid: currentUser.id,
      productId: id,
      selectedVariationId,
    });

    if (isExists) {
      await Cart.updateOne(
        { uid: currentUser.id, productId: id },
        { $set: { quantity: isExists.quantity + 1 } }
      );
      return res.status(200).json({ success: true, already: true });
    }

    await Cart.create({
      id: cartId,
      productId: id,
      createdAt: Date.now(),
      quantity: 1,
      uid: currentUser.id,
      selectedVariationId,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-cart", checkAuth, async (req, res) => {
  const currentUser = req.user;

  try {
    const data = await Cart.find({ uid: currentUser.id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
