const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + req.user.id + path.extname(file.originalname)
    );
  },
});

const storage1 = multer.diskStorage({
  destination: "./public/category/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + req.body.id + path.extname(file.originalname)
    );
  },
});

const storage2 = multer.diskStorage({
  destination: "./public/brands/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + req.body.id + path.extname(file.originalname)
    );
  },
});

const storage3 = multer.diskStorage({
  destination: "./public/product/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const storage4 = multer.diskStorage({
  destination: "./public/sliders/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + req.body.id + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });
const uploadCategory = multer({ storage: storage1 });
const uploadBrand = multer({ storage: storage2 });
const uploadProduct = multer({ storage: storage3 });
const uploadSlider = multer({ storage: storage4 });

module.exports = {
  upload,
  uploadCategory,
  uploadBrand,
  uploadProduct,
  uploadSlider,
};
