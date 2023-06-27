const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  category: {
    type: Object,
  },
  subCategory: {
    type: Object,
  },
  innerSubCategory: {
    type: Object,
  },
  name: {
    type: String,
  },
  sku: {
    type: String,
  },
  brandName: {
    type: String,
  },
  img: {
    type: String,
  },
  tags: {
    type: Array,
  },
  variations: {
    type: Object,
  },
  pricing: {
    oldPrice: {
      type: String,
    },
    discountedPrice: {
      type: String,
    },
    quantity: {
      type: String,
    },
  },
  description: {
    type: String,
  },
  shippingConfig: {
    type: Object,
  },
  isFeature: {
    type: Boolean,
  },
  isHotDeals: {
    type: Boolean,
  },
  shippingTime: {
    type: String,
  },
  tax: {
    type: Object,
  },
  id: {
    type: String,
  },
  vendorId: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
});

module.exports = mongoose.model("products", productsSchema);
