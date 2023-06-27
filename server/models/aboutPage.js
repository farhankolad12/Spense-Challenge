const mongoose = require("mongoose");
const aboutPageSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("aboutPage", aboutPageSchema);
