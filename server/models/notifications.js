const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  productId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  trackId: {
    type: String,
  },
  iconTheme: {
    type: Object,
  },
  uid: {
    type: String,
  },
});

module.exports = mongoose.model("notifications", notificationSchema);
