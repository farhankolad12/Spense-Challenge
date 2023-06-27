require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const placeOrderRoute = require("./placeOrder");
const userOrdersRoute = require("./userOrders");
const trackOrdersRoute = require("./trackOrderId");
const orderDetailRoute = require("./orderDetail");
const vendorOrdersRoute = require("./vendorOrders");
const vendorOrderDetailRoute = require("./vendorOrderDetail");
const changeStatusRoute = require("./changeStatus");
const vendorTotalOrdersRoute = require("./vendorTotalOrders");

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

router.use("/", placeOrderRoute);
router.use("/", userOrdersRoute);
router.use("/", orderDetailRoute);
router.use("/", trackOrdersRoute);
router.use("/", vendorOrdersRoute);
router.use("/", vendorOrderDetailRoute);
router.use("/", vendorTotalOrdersRoute);
router.use("/", changeStatusRoute);

module.exports = router;
