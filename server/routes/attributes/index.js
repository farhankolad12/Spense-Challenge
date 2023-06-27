require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const addAttributeRoute = require("./addAttribute");
const getAttributeRoute = require("./getAttribute");
const deleteAttributeRoute = require("./deleteAttribute");

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

router.use("/", addAttributeRoute);
router.use("/", getAttributeRoute);
router.use("/", deleteAttributeRoute);

module.exports = router;
