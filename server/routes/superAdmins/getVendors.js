const express = require("express");
const router = express.Router();

const Orders = require("../../models/orders");
const Vendors = require("../../models/admins");
const Products = require("../../models/products");

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

router.get(
  "/vendors",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    try {
      const data = await Vendors.find(
        { type: "vendor" },
        {
          password: 0,
          address: 0,
          storeName: 0,
        }
      );
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

router.get(
  "/vendor-id",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id } = req.query;

    try {
      const data = await Vendors.findOne({ id, type: "vendor" });
      const totalProducts = await Products.count({ vendorId: data.id });
      const totalOrders = await Orders.count({
        vendorIdWithProductId: { $elemMatch: { vendorId: data.id } },
      });

      const totalCancelOrders = await Orders.count({
        vendorIdWithProductId: {
          $elemMatch: {
            vendorId: data.id,
            track: { $elemMatch: { heading: "Order Cancelled" } },
          },
        },
      });

      const newData = {
        id: data.id,
        logo: data.logo,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
        storeName: data.storeName,
        createdAt: data.createdAt,
      };

      return res
        .status(200)
        .json({ ...newData, totalProducts, totalOrders, totalCancelOrders });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
