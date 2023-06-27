const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

const Products = require("../../models/products");

router.post("/delete-product", checkAuthAdmin, async (req, res) => {
  const currentUser = req.user;
  const { id } = req.body;

  try {
    const isExists = await Products.findOne({ id });

    if (isExists && isExists.vendorId === currentUser.id) {
      await Products.deleteOne({ id });
      return res.status(200).json({ success: true });
    }

    return res.status(409).json({ success: false, message: "Not allowed!" });
  } catch (err) {
    return res.status(409).json({ success: false, message: err.message });
  }
});

module.exports = router;
