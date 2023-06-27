const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

const Category = require("../../models/category");
const SubCategory = require("../../models/subcategory");
const InnerSubCategory = require("../../models/innersubcategory");

router.post(
  "/delete-category",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id } = req.body;

    try {
      await Category.deleteOne({ id });
      await SubCategory.deleteMany({ categoryId: id });
      await InnerSubCategory.deleteMany({ categoryId: id });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  }
);

module.exports = router;
