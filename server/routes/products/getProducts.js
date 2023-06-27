const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

const Products = require("../../models/products");

router.get("/get-products", checkAuthAdmin, async (req, res) => {
  const currentUser = req.user;

  try {
    const data = await Products.find({ vendorId: currentUser.id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-product-id-edit", checkAuthAdmin, async (req, res) => {
  const currentUser = req.user;
  const { id } = req.query;

  try {
    const data = await Products.findOne({ id, vendorId: currentUser.id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-product-id", async (req, res) => {
  const { id } = req.query;

  try {
    const data = await Products.findOne({ id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-by-categories", async (req, res) => {
  const { category, subCategory, innerSubCategory } = req.query;

  try {
    let data;
    if (category) {
      data = await Products.find({
        "category.name": category,
      });
    }

    if (category && subCategory) {
      data = await Products.find({
        "category.name": category,
        "subCategory.name": subCategory,
      });
    }

    if (category && subCategory && innerSubCategory) {
      data = await Products.find({
        "category.name": category,
        "subCategory.name": subCategory,
        "innerSubCategory.name": innerSubCategory,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-new-products", async (req, res) => {
  try {
    const sevenDaysDate = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const data = await Products.find({ createdAt: { $gt: sevenDaysDate } });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-featured-products", async (req, res) => {
  try {
    const data = await Products.find({ isFeature: true });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-hot-products", async (req, res) => {
  try {
    const data = await Products.find({ isHotDeals: true });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-products-brand", async (req, res) => {
  const { name } = req.query;

  try {
    const data = await Products.find({ brandName: name });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-products-vendor", async (req, res) => {
  const { id } = req.query;

  try {
    const data = await Products.find({ vendorId: id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/vendor-total-products", checkAuthAdmin, async (req, res) => {
  const currentUser = req.user;

  try {
    const data = await Products.count({ vendorId: currentUser.id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-all-products", async (req, res) => {
  try {
    const data = await Products.find().sort({ createdAt: -1 });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
