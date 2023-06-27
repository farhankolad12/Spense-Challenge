const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  productId: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  createdAt: {
    type: Number,
  },
  uid: {
    type: String,
  },
  couponCode: {
    type: Object,
  },
  selectedVariationId: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("cart", cartSchema);
