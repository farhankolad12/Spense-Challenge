require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const aboutRouter = require("./about");
const privacyPolicyRouter = require("./privacyPolicy");
const termsConditionsRouter = require("./termsConditions");

router.use(bodyParser.json());
router.use(cookieParser());
router.use(
  cors({
    origin: [process.env.CLIENT_HOST_NAME, process.env.CLIENT_ADMIN_HOST_NAME],
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true,
  })
);

router.use("/", aboutRouter);
router.use("/", privacyPolicyRouter);
router.use("/", termsConditionsRouter);

module.exports = router;
