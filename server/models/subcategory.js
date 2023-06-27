const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  categoryId: {
    type: String,
  },
});

module.exports = mongoose.model("subcategory", subCategorySchema);
