const express = require("express");
const router = express.Router();

const { uploadBrand } = require("../../middlewares/upload");
const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

const Brands = require("../../models/brand");

router.post(
  "/add-brand",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  uploadBrand.any(),
  async (req, res) => {
    const { id, name } = req.body;

    try {
      const isExists = await Brands.findOne({ id });

      if (isExists) {
        await Brands.updateOne(
          { id },
          { img: req.files[0] ? req.files[0].filename : isExists.img, name }
        );
        return res.status(200).json({ success: true });
      }

      await Brands.create({
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
