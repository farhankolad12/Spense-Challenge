const express = require("express");
const router = express.Router();

const Orders = require("../../models/orders");
const Products = require("../../models/products");

const checkAuth = require("../../middlewares/checkAuth");

router.get("/user-orders", checkAuth, async (req, res) => {
  const currentUser = req.user;
  let data = [];

  try {
    const orders = await Orders.find({ customerId: currentUser.id }).sort({
      createdAt: -1,
    });
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      let totalValue = 0;
      let discountedPrice = 0;
      if (order.couponCode) {
        discountedPrice = order.couponCode.discountPrice;
      }

      for (let j = 0; j < order.vendorIdWithProductId.length; j++) {
        const cartInfo = order.vendorIdWithProductId[j];
        const product = await Products.findOne({ id: cartInfo.productId });

        const subTotal = product.pricing.oldPrice
          ? +product.pricing.discountedPrice * cartInfo.quantity
          : +product.variations.info[
              product.variations.info
                .map((x) => x.id)
                .indexOf(cartInfo.selectedVariationId)
            ].discountedPrice * cartInfo.quantity;
        const taxTotal =
          product.tax.type === "Percent"
            ? product.pricing.oldPrice
              ? (product.tax.rate / 100) *
                +product.pricing.discountedPrice *
                cartInfo.quantity
              : (product.tax.rate / 100) *
                +product.variations.info[
                  product.variations.info
                    .map((x) => x.id)
                    .indexOf(cartInfo.selectedVariationId)
                ].discountedPrice *
                cartInfo.quantity
            : product.tax.rate * cartInfo.quantity;
        const shippingTotal = product.shippingConfig.freeShiping
          ? 0
          : product.shippingConfig.rate;
        totalValue += subTotal + taxTotal + shippingTotal;
      }
      data.push({
        id: order.id,
        paymentMode: order.paymentMode,
        totalValue: totalValue - +discountedPrice,
        createdAt: order.createdAt,
      });
    }
    /*     orders.forEach(async (order) => {
      let totalValue = 0;
      let discountedPrice;
      if (order.couponCode) {
        discountedPrice = order.couponCode.discountPrice;
      }
      order.vendorIdWithProductId.forEach(async (cartInfo) => {
        const product = await Products.findOne({ id: cartInfo.productId });

        const subTotal = product.pricing.oldPrice
          ? +product.pricing.discountedPrice * cartInfo.quantity
          : +product.variations.info[
              product.variations.info
                .map((x) => x.id)
                .indexOf(cartInfo.selectedVariationId)
            ].discountedPrice * cartInfo.quantity;
        const taxTotal =
          product.tax.type === "Percent"
            ? product.pricing.oldPrice
              ? (product.tax.rate / 100) *
                +product.pricing.discountedPrice *
                cartInfo.quantity
              : (product.tax.rate / 100) *
                +product.variations.info[
                  product.variations.info
                    .map((x) => x.id)
                    .indexOf(cartInfo.selectedVariationId)
                ].discountedPrice *
                cartInfo.quantity
            : product.tax.rate * cartInfo.quantity;
        const shippingTotal = product.shippingConfig.freeShiping
          ? 0
          : product.shippingConfig.rate;
        totalValue += subTotal + taxTotal + shippingTotal;
      });
      data.push({
        id: order.id,
        paymentMode: order.paymentMode,
        totalValue: totalValue - +discountedPrice,
        createdAt: order.createdAt,
      });
    }); */
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
