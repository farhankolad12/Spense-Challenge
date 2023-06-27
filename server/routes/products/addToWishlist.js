const express = require("express");
const router = express.Router();

const checkAuth = require("../../middlewares/checkAuth");

const Wishlists = require("../../models/wishlists");

router.post("/add-wishlist", checkAuth, async (req, res) => {
  const currentUser = req.user;
  const { id, wishId } = req.body;

  try {
    const isExists = await Wishlists.findOne({
      uid: currentUser.id,
      productId: id,
    });

    if (isExists) {
      await Wishlists.deleteOne({ uid: currentUser.id, productId: id });
      return res.status(200).json({ success: true });
    }

    await Wishlists.create({
      id: wishId,
      productId: id,
      createdAt: Date.now(),
      quantity: 1,
      uid: currentUser.id,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-wishlist", checkAuth, async (req, res) => {
  const currentUser = req.user;

  try {
    const data = await Wishlists.find({ uid: currentUser.id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
