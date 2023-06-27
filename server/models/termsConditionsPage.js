const mongoose = require("mongoose");
const termsConditionsPageSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model(
  "termsConditionsPage",
  termsConditionsPageSchema
);
