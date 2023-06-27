require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const checkAuth = require("../../middlewares/checkAuth");
const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

const loginRouter = require("./login");
const signupRouter = require("./signup");
const checkOtpRouter = require("./checkOtp");
const logoutRouter = require("./logout");
const vendorSignupRouter = require("./vendorSignup");
const adminLoginRouter = require("./adminLogin");
const adminLogoutRouter = require("./adminLogout");

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

router.use("/", loginRouter);
router.use("/", signupRouter);
router.use("/", checkOtpRouter);
router.use("/", logoutRouter);
router.use("/", vendorSignupRouter);
router.use("/", adminLoginRouter);
router.use("/", adminLogoutRouter);

// Check Auth
router.get("/check-auth", checkAuth, async (req, res) => {
  const currentUser = req.user;

  return res.status(200).json({ success: true, currentUser });
});

router.get("/check-auth-admin", checkAuthAdmin, async (req, res) => {
  const currentUser = req.user;

  return res.status(200).json({ success: true, currentUser });
});

module.exports = router;
