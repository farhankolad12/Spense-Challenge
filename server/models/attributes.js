const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("attributes", attributeSchema);
