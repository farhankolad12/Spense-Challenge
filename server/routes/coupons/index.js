require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const addCouponRoute = require("./addCoupon");
const getCouponRoute = require("./getCoupons");
const checkCouponRoute = require("./checkCoupon");
const deleteCouponRoute = require("./deleteCoupon");

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

router.use("/", addCouponRoute);
router.use("/", getCouponRoute);
router.use("/", checkCouponRoute);
router.use("/", deleteCouponRoute);

module.exports = router;
