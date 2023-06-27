const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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

module.exports = mongoose.model("category", categorySchema);
