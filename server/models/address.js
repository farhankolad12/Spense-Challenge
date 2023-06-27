const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  address: Array,
});

module.exports = mongoose.model("address", addressSchema);
