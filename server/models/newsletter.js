const mongoose = require("mongoose");
const newsLetterSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("newsletter", newsLetterSchema);
