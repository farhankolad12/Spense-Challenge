const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  productId: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
  uid: {
    type: String,
  },
});

module.exports = mongoose.model("wishlists", wishlistSchema);
