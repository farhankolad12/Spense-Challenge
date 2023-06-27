const express = require("express");
const router = express.Router();

const { uploadCategory } = require("../../middlewares/upload");
const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

const Category = require("../../models/category");

router.post(
  "/add-category",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  uploadCategory.any(),
  async (req, res) => {
    const { id, name } = req.body;

    try {
      const isExists = await Category.findOne({ id });

      if (isExists) {
        await Category.updateOne(
          { id },
          { img: req.files[0] ? req.files[0].filename : isExists.img, name }
        );
        return res.status(200).json({ success: true });
      }

      await Category.create({
        id,
        img: req.files[0].filename,
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
