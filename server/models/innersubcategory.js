const mongoose = require("mongoose");

const innerSubCategorySchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  categoryId: {
    type: String,
  },
  subCategoryId: {
    type: String,
  },
});

module.exports = mongoose.model("innersubcategory", innerSubCategorySchema);
