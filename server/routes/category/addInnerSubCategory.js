const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

const InnerSubCategory = require("../../models/innersubcategory");

router.post(
  "/add-innersubcategory",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id, name, categoryId, subCategoryId } = req.body;

    try {
      const isExists = await InnerSubCategory.findOne({ id });

      if (isExists) {
        await InnerSubCategory.updateOne(
          { id },
          { categoryId, name, subCategoryId }
        );
        return res.status(200).json({ success: true });
      }

      await InnerSubCategory.create({
        id,
        categoryId,
        name,
        subCategoryId,
      });
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
