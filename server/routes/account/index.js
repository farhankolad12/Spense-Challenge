require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Routes
const saveProfileRouter = require("./saveProfile");
const changePasswordRouter = require("./changePassword");
const saveAddressRouter = require("./saveAddress");
const getAddressRouter = require("./getAddress");
const deleteAddressRouter = require("./deleteAddress");
const editAddressRouter = require("./editAddress");
const getProfileRouter = require("./getProfile");

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

router.use("/", saveProfileRouter);
router.use("/", changePasswordRouter);
router.use("/", saveAddressRouter);
router.use("/", getAddressRouter);
router.use("/", deleteAddressRouter);
router.use("/", getProfileRouter);
router.use("/", editAddressRouter);

module.exports = router;
