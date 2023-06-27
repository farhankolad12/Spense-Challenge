const express = require("express");
const router = express.Router();

const Orders = require("../../models/orders");
const Reviews = require("../../models/reviews");
const GoldCoinsWallet = require("../../models/goldWalletCoins");
const GoldCoinsWalletTransaction = require("../../models/goldCoinsTransaction");

const checkAuth = require("../../middlewares/checkAuth");

router.post("/add-review", checkAuth, async (req, res) => {
  const currentUser = req.user;
  const { id, rating, comment, trackId, productId, vendorId } = req.body;

  try {
    const order = await Orders.findOne({
      customerId: currentUser.id,
      vendorIdWithProductId: { $elemMatch: { id: +trackId } },
    });
    if (order) {
      await Reviews.create({
        id,
        comment,
        customerId: currentUser.id,
        productId,
        vendorId,
        rating,
        trackId,
        createdAt: Date.now(),
      });
      const isExists = await GoldCoinsWallet.findOne({
        uid: order.customerId,
      });
      if (isExists) {
        await GoldCoinsWallet.updateOne(
          { uid: order.customerId },
          {
            $set: {
              totalBalance: isExists.totalBalance + 5,
              availableBalance: isExists.availableBalance + 5,
            },
          }
        );
      } else {
        await GoldCoinsWallet.create({
          id: Math.floor(Math.random() * 9999).toString(),
          totalBalance: 5,
          availableBalance: 5,
          createdAt: Date.now(),
          uid: order.customerId,
        });
      }
      await GoldCoinsWalletTransaction.create({
        amount: 5,
        createdAt: Date.now(),
        id: Math.floor(Math.random() * 9999).toString(),
        message: "Recieved 5 gold coins for a giving review",
        type: "in",
        uid: order.customerId,
      });
      return res.status(200).json({ success: true });
    }
    return res.status(409).json({ success: false, message: "Not allowed!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
