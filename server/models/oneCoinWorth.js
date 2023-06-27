const mongoose = require("mongoose");
const oneCoinWorthSchema = new mongoose.Schema({
  id: { type: String, default: Math.floor(Math.random() * 999).toString() },
  worth: { type: Number, default: 0.82 },
});

module.exports = mongoose.model("oneCoinWorth", oneCoinWorthSchema);
