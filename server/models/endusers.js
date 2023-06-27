const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  fullName: {
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
  otp: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profileImg: {
    type: String,
  },
});

module.exports = mongoose.model("endusers", usersSchema);
