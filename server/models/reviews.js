const mongoose = require("mongoose");
const reviewsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  vendorId: {
    type: String,
  },
  customerId: {
    type: String,
  },
  productId: {
    type: String,
  },
  trackId: {
    type: String,
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("reviews", reviewsSchema);
