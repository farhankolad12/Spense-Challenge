const mongoose = require("mongoose");
const slidersSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  link: {
    type: String,
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model("sliders", slidersSchema);
