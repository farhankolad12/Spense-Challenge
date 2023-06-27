const express = require("express");
const router = express.Router();

const Cart = require("../../models/cart");
const Orders = require("../../models/orders");
const Products = require("../../models/products");
const Notifications = require("../../models/notifications");

const checkAuth = require("../../middlewares/checkAuth");

router.post("/place-order", checkAuth, async (req, res) => {
  const currentUser = req.user;
  const { id, addressId, orderNote, paymentMode } = req.body;

  try {
    const cartItems = await Cart.find({ uid: currentUser.id });

    let totalCartValue = 0;
    let vendorIdProductId = [];

    for (let i = 0; i < cartItems.length; i++) {
      const cartItem = cartItems[i];

      const product = await Products.findOne({ id: cartItem.productId });

      const price = product.pricing.oldPrice
        ? +product.pricing.discountedPrice * cartItem.quantity +
          (product.tax.type === "Percent"
            ? (product.tax.rate / 100) *
              +product.pricing.discountedPrice *
              cartItem.quantity
            : product.tax.rate * cartItem.quantity) +
          (product.shippingConfig.freeShiping ? 0 : product.shippingConfig.rate)
        : +product.variations.info[
            product.variations.info
              .map((x) => x.id)
              .indexOf(cartItem.selectedVariationId)
          ].discountedPrice *
            cartItem.quantity +
          (product.tax.type === "Percent"
            ? (product.tax.rate / 100) *
              +product.variations.info[
                product.variations.info
                  .map((x) => x.id)
                  .indexOf(cartItem.selectedVariationId)
              ].discountedPrice *
              cartItem.quantity
            : product.tax.rate) +
          (product.shippingConfig.freeShiping
            ? 0
            : product.shippingConfig.rate);

      const trackId = Math.floor(Math.random() * 999999);

      await Notifications.create({
        id: Math.floor(Math.random() * 99999).toString(),
        createdAt: Date.now(),
        iconTheme: {
          bgColor: "bg-warning",
          icon: "box-seam",
        },
        message: "Order has been placed",
        orderId: id,
        productId: product.id,
        trackId,
        uid: currentUser.id,
      });
      vendorIdProductId.push({
        id: trackId,
        productId: product.id,
        selectedVariationId: cartItem.selectedVariationId,
        vendorId: product.vendorId,
        quantity: cartItem.quantity,
        track: [
          {
            heading: "Order Place",
            about: "Order has been placed",
            icon: "journal-check",
          },
        ],
      });

      totalCartValue += price;
    }
    await Orders.create({
      id,
      addressId,
      orderNote,
      paymentMode,
      vendorIdWithProductId: vendorIdProductId,
      couponCode: cartItems[0].couponCode,
      customerId: currentUser.id,
      createdAt: Date.now(),
    });
    await Cart.deleteMany({ uid: currentUser.id });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
