const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  vendorIdWithProductId: {
    type: Array,
  },
  addressId: {
    type: String,
  },
  orderNote: {
    type: String,
  },
  paymentMode: {
    type: String,
  },
  couponCode: {
    type: Object,
  },
  customerId: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("orders", orderSchema);
