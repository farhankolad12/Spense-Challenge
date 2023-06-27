const express = require("express");
const router = express.Router();

const { uploadProduct } = require("../../middlewares/upload");
const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

const Products = require("../../models/products");

router.post(
  "/add-product",
  checkAuthAdmin,
  uploadProduct.any(),
  async (req, res) => {
    const currentUser = req.user;
    const {
      category,
      subCategory,
      innerSubCategory,
      name,
      sku,
      brandName,
      img,
      tags,
      variations,
      pricing,
      description,
      shippingConfig,
      isFeature,
      isHotDeals,
      shippingTime,
      tax,
      id,
    } = req.body;

    try {
      const isExists = await Products.findOne({ id });

      if (isExists) {
        // Update Product
        return res.status(200).json({ success: true });
      }

      await Products.create({
        category: JSON.parse(category),
        subCategory: JSON.parse(subCategory),
        innerSubCategory: JSON.parse(innerSubCategory),
        name,
        sku,
        brandName,
        img: req.files[0].filename,
        tags: JSON.parse(tags),
        variations: JSON.parse(variations),
        pricing: JSON.parse(pricing),
        description,
        shippingConfig: JSON.parse(shippingConfig),
        isFeature,
        isHotDeals,
        shippingTime,
        tax: JSON.parse(tax),
        id,
        vendorId: currentUser.id,
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
