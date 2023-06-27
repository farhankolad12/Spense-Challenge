require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const getVendorsRoute = require("./getVendors");
const vendorLoginRoute = require("./vendorLogin");
const getCustomersRoute = require("./getCustomers");

router.use(bodyParser.json());
router.use(cookieParser());
router.use(
  cors({
    origin: [process.env.CLIENT_ADMIN_HOST_NAME],
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true,
  })
);

router.use("/", getVendorsRoute);
router.use("/", vendorLoginRoute);
router.use("/", getCustomersRoute);

module.exports = router;
