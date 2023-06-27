const mongoose = require("mongoose");
const goldCoinsWalletSchema = new mongoose.Schema({
  id: { type: String },
  uid: { type: String },
  totalBalance: { type: Number, default: 0 },
  availableBalance: { type: Number, default: 0 },
  createdAt: { type: Date },
});

module.exports = mongoose.model("goldCoinsWallet", goldCoinsWalletSchema);
