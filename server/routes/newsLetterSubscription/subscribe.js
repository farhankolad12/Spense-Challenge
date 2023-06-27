const express = require("express");
const router = express.Router();

const NewsLetter = require("../../models/newsletter");

router.post("/subscribe", async (req, res) => {
  const { email, id } = req.body;

  try {
    const alreadyExists = await NewsLetter.findOne({ email });
    if (alreadyExists) {
      return res
        .status(200)
        .json({ success: true, message: "Already Subscribed!" });
    }
    await NewsLetter.create({
      id,
      email,
      createdAt: Date.now(),
    });
    return res
      .status(200)
      .json({ success: true, message: "Successfully Subscribed!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
