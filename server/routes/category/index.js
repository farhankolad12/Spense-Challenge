require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const addCategoryRouter = require("./addCategory");
const addSubCategoryRouter = require("./addSubCategory");
const getCategoryRouter = require("./getCategory");
const getSubCategoryRouter = require("./getSubCategory");
const deleteCategoryRouter = require("./deleteCategory");
const deleteSubCategoryRouter = require("./deleteSubCategory");
const deleteInnerSubCategoryRouter = require("./deleteInnerSubCategory");
const getCategoryIdRouter = require("./getCategoryId");
const getSubCategoryIdRouter = require("./getSubCategoryId");
const addInnerSubCategoryRouter = require("./addInnerSubCategory");
const getInnerSubCategoryRouter = require("./getInnerSubCategory");
const getAllCategoriesRouter = require("./getAllCategories");

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

router.use("/", addCategoryRouter);
router.use("/", addSubCategoryRouter);
router.use("/", getCategoryRouter);
router.use("/", getCategoryIdRouter);
router.use("/", deleteCategoryRouter);
router.use("/", getSubCategoryRouter);
router.use("/", getSubCategoryIdRouter);
router.use("/", deleteSubCategoryRouter);
router.use("/", addInnerSubCategoryRouter);
router.use("/", getInnerSubCategoryRouter);
router.use("/", deleteInnerSubCategoryRouter);
router.use("/", getAllCategoriesRouter);

module.exports = router;
