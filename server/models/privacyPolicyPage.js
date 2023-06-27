const mongoose = require("mongoose");
const privacyPolicyPageSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("privacyPolicyPage", privacyPolicyPageSchema);
