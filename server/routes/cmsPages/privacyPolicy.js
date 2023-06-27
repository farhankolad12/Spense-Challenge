const express = require("express");
const router = express.Router();

const PrivacyPolicyPage = require("../../models/privacyPolicyPage");

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

router.get("/privacy-policy", async (req, res) => {
  try {
    const data = await PrivacyPolicyPage.findOne();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post(
  "/save-privacy-policy",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id, content } = req.body;

    try {
      const isExists = await PrivacyPolicyPage.findOne();
      if (isExists) {
        await PrivacyPolicyPage.updateOne(
          { id: isExists.id },
          { $set: { id, content } }
        );
        return res.status(200).json({ success: true });
      }

      await PrivacyPolicyPage.create({
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
