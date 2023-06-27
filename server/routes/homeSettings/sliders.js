const express = require("express");
const router = express.Router();

const Sliders = require("../../models/sliders");

const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");
const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const { uploadSlider } = require("../../middlewares/upload");

router.get("/get-sliders", async (req, res) => {
  try {
    const data = await Sliders.find();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post(
  "/save-sliders",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  uploadSlider.any(),
  async (req, res) => {
    const { id, link } = req.body;

    try {
      await Sliders.create({
        id,
        link,
        img: req.files[0].filename,
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

router.post(
  "/delete-slider",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id } = req.body;

    try {
      await Sliders.deleteOne({ id });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
