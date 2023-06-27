const mongoose = require("mongoose");

const adminsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  logo: {
    type: String,
  },
  storeName: {
    type: String,
  },
  address: {
    type: String,
  },
  type: {
    type: String,
  },
});

module.exports = mongoose.model("admins", adminsSchema);
