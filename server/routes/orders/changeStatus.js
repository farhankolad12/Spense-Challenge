const express = require("express");
const router = express.Router();

const Orders = require("../../models/orders");
const Products = require("../../models/products");
const Notifications = require("../../models/notifications");
const GoldCoinsWallet = require("../../models/goldWalletCoins");
const GoldCoinsWalletTransaction = require("../../models/goldCoinsTransaction");

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

router.post("/change-status", checkAuthAdmin, async (req, res) => {
  const currentUser = req.user;
  const { id, status } = req.body;

  let orderStatus = [];

  try {
    const order = await Orders.findOne({
      vendorIdWithProductId: {
        $elemMatch: { vendorId: currentUser.id, id: +id },
      },
    });
    const productOrder = order.vendorIdWithProductId.filter(
      (vo) => vo.id === +id
    )[0];
    const product = await Products.findOne({
      id: productOrder.productId,
    });
    if (status.toLowerCase().includes("place")) {
      orderStatus = [
        {
          heading: "Order Placed",
          about: "Order has been placed",
          icon: "journal-check",
        },
      ];
    } else if (status.toLowerCase().includes("confirmed")) {
      orderStatus = [
        {
          heading: "Order Placed",
          about: "Order has been placed",
          icon: "journal-check",
        },
        {
          heading: "Order Confirmed",
          about: "Order has been confirmed",
          icon: "box-seam",
        },
      ];
      await Notifications.create({
        createdAt: Date.now(),
        iconTheme: {
          bgColor: "bg-primary",
          icon: "cart-check",
        },
        id: Math.floor(Math.random() * 9999).toString(),
        orderId: order.id,
        trackId: id,
        uid: order.customerId,
        productId: productOrder.productId,
        message: product.name + " has been confirmed",
      });
    } else if (status.toLowerCase().includes("shipped")) {
      orderStatus = [
        {
          heading: "Order Placed",
          about: "Order has been placed",
          icon: "journal-check",
        },
        {
          heading: "Order Confirmed",
          about: "Order has been confirmed",
          icon: "box-seam",
        },
        {
          heading: "Order Shipped",
          about: "Order has been shipped",
          icon: "gift",
        },
      ];
      await Notifications.create({
        createdAt: Date.now(),
        iconTheme: {
          bgColor: "bg-info",
          icon: "truck",
        },
        id: Math.floor(Math.random() * 9999).toString(),
        orderId: order.id,
        trackId: id,
        uid: order.customerId,
        productId: productOrder.productId,
        message: product.name + " has been shipped",
      });
    } else if (status.toLowerCase().includes("delivered")) {
      orderStatus = [
        {
          heading: "Order Placed",
          about: "Order has been placed",
          icon: "journal-check",
        },
        {
          heading: "Order Confirmed",
          about: "Order has been confirmed",
          icon: "box-seam",
        },
        {
          heading: "Order Shipped",
          about: "Order has been shipped",
          icon: "gift",
        },
        {
          heading: "Order Delivered",
          about: "Order has been delivered",
          icon: "hand-thumbs-up",
        },
      ];
      const isExists = await GoldCoinsWallet.findOne({ uid: order.customerId });
      if (isExists) {
        await GoldCoinsWallet.updateOne(
          { uid: order.customerId },
          {
            $set: {
              totalBalance: isExists.totalBalance + 10,
              availableBalance: isExists.availableBalance + 10,
            },
          }
        );
      } else {
        await GoldCoinsWallet.create({
          id: Math.floor(Math.random() * 9999).toString(),
          totalBalance: 10,
          availableBalance: 10,
          createdAt: Date.now(),
          uid: order.customerId,
        });
      }
      await GoldCoinsWalletTransaction.create({
        amount: 10,
        createdAt: Date.now(),
        id: Math.floor(Math.random() * 9999).toString(),
        message: "Recieved 10 gold coins for a purchase",
        type: "in",
        uid: order.customerId,
      });
      await Notifications.create({
        createdAt: Date.now(),
        iconTheme: {
          bgColor: "bg-success",
          icon: "clipboard2-check",
        },
        id: Math.floor(Math.random() * 9999).toString(),
        orderId: order.id,
        trackId: id,
        uid: order.customerId,
        productId: productOrder.productId,
        message: product.name + " has been delivered",
      });
    } else {
      orderStatus = [
        {
          heading: "Order Cancelled",
          about: "Order has been cancelled",
        },
      ];
      await Notifications.create({
        createdAt: Date.now(),
        iconTheme: {
          bgColor: "bg-danger",
          icon: "cart-x",
        },
        id: Math.floor(Math.random() * 9999).toString(),
        orderId: order.id,
        trackId: id,
        uid: order.customerId,
        productId: productOrder.productId,
        message: `Order ${order.id} has been cancelled`,
      });
    }
    const newVendorIdWithProductId = [
      ...order.vendorIdWithProductId.filter((vo) => vo.id !== +id),
      {
        id: +id,
        productId: productOrder.productId,
        vendorId: currentUser.id,
        quantity: productOrder.quantity,
        track: orderStatus,
      },
    ];

    await Orders.updateOne(
      {
        vendorIdWithProductId: {
          $elemMatch: { vendorId: currentUser.id, id: +id },
        },
      },
      {
        $set: {
          vendorIdWithProductId: newVendorIdWithProductId,
        },
      }
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
