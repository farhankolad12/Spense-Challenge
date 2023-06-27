const express = require("express");
const router = express.Router();

const Category = require("../../models/category");
const Products = require("../../models/products");
const TopBanners = require("../../models/topBanners");

const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");
const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const { uploadSlider } = require("../../middlewares/upload");

router.post(
  "/add-top-banner",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  uploadSlider.any(),
  async (req, res) => {
    const { id, type, category, product } = req.body;

    try {
      const categoryName = await Category.findOne({ id: category });
      const productName = await Products.findOne({ id: product });

      await TopBanners.create({
        id,
        type,
        category: categoryName ? categoryName.name : "",
        product: productName ? productName.name : "",
        img: req.files[0].filename,
      });
      res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

router.get("/get-top-banner", async (req, res) => {
  try {
    const data = await TopBanners.find();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post(
  "/delete-top-banner",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id } = req.body;

    try {
      await TopBanners.deleteOne({ id });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
