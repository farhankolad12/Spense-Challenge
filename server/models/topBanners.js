const mongoose = require("mongoose");
const topBannerSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  img: {
    type: String,
  },
  product: {
    type: String,
  },
  type: {
    type: String,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("topBanners", topBannerSchema);
