const express = require("express");
const router = express.Router();

const UserWallet = require("../../models/goldWalletCoins");
const WalletTransactions = require("../../models/goldCoinsTransaction");

const checkAuth = require("../../middlewares/checkAuth");

router.get("/get-wallet", checkAuth, async (req, res) => {
  const currentUser = req.user;

  try {
    const data = await UserWallet.findOne({ uid: currentUser.id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-transactions", checkAuth, async (req, res) => {
  const currentUser = req.user;

  try {
    const data = await WalletTransactions.find({ uid: currentUser.id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
