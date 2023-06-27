const mongoose = require("mongoose");
const largeBannersSchema = new mongoose.Schema({
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

module.exports = mongoose.model("largeBanners", largeBannersSchema);
