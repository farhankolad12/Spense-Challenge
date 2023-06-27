const express = require("express");
const router = express.Router();

const AboutPage = require("../../models/aboutPage");

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

router.get("/about", async (req, res) => {
  try {
    const data = await AboutPage.findOne();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post(
  "/save-about",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id, content } = req.body;

    try {
      const isExists = await AboutPage.findOne();
      if (isExists) {
        await AboutPage.updateOne(
          { id: isExists.id },
          { $set: { id, content } }
        );
        return res.status(200).json({ success: true });
      }

      await AboutPage.create({
        content,
        id,
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
