require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const addBrandRoute = require("./addBrand");
const getBrandRoute = require("./getBrand");
const deleteBrandRoute = require("./deleteBrand");

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

router.use("/", addBrandRoute);
router.use("/", getBrandRoute);
router.use("/", deleteBrandRoute);

module.exports = router;
