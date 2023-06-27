const express = require("express");
const router = express.Router();

const TermsConditionsPage = require("../../models/termsConditionsPage");

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

router.get("/terms-conditions", async (req, res) => {
  try {
    const data = await TermsConditionsPage.findOne();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post(
  "/save-terms-conditions",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id, content } = req.body;

    try {
      const isExists = await TermsConditionsPage.findOne();
      if (isExists) {
        await TermsConditionsPage.updateOne(
          { id: isExists.id },
          { $set: { id, content } }
        );
        return res.status(200).json({ success: true });
      }

      await TermsConditionsPage.create({
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
