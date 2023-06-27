const mongoose = require("mongoose");
const goldCoinsTransactionSchema = new mongoose.Schema({
  id: { type: String },
  uid: { type: String },
  type: { type: String },
  amount: { type: Number },
  message: { type: String },
  createdAt: { type: Date },
});

module.exports = mongoose.model(
  "goldCoinsTransaction",
  goldCoinsTransactionSchema
);
