const mongoose = require("mongoose");

const couponsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  amount: {
    type: String,
  },
  usagePerUser: {
    type: String,
  },
  perUser: {
    type: String,
  },
  startDate: {
    type: Number,
  },
  endDate: {
    type: Number,
  },
  minimumAmount: {
    type: String,
  },
});

module.exports = mongoose.model("coupons", couponsSchema);
