require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const addProductRoute = require("./addProducts");
const getProductRoute = require("./getProducts");
const deleteProductRoute = require("./deleteProducts");
const addToCartRoute = require("./addToCart");
const addToWishlistRoute = require("./addToWishlist");
const deleteCartRoute = require("./deleteCart");

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

router.use("/", addProductRoute);
router.use("/", getProductRoute);
router.use("/", deleteProductRoute);
router.use("/", addToCartRoute);
router.use("/", deleteCartRoute);
router.use("/", addToWishlistRoute);

module.exports = router;
