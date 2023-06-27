const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model("brands", brandSchema);
