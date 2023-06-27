const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

const SubCategory = require("../../models/subcategory");

router.post(
  "/add-subcategory",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id, name, categoryId } = req.body;

    try {
      const isExists = await SubCategory.findOne({ id });

      if (isExists) {
        await SubCategory.updateOne({ id }, { categoryId, name });
        return res.status(200).json({ success: true });
      }

      await SubCategory.create({
        id,
        categoryId,
        name,
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
