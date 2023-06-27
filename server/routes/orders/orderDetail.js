const express = require("express");
const router = express.Router();

const Orders = require("../../models/orders");
const Products = require("../../models/products");

const checkAuth = require("../../middlewares/checkAuth");

router.get("/order-detail", checkAuth, async (req, res) => {
  const { id } = req.query;
  const currentUser = req.user;

  try {
    const order = await Orders.findOne({ customerId: currentUser.id, id });

    let totalValue = 0;
    let subTotal = 0;
    let taxTotal = 0;
    let totalShipping = 0;
    let discountedPrice = 0;

    if (order.couponCode) {
      discountedPrice = order.couponCode.discountPrice;
    }

    for (let i = 0; i < order.vendorIdWithProductId.length; i++) {
      const cartInfo = order.vendorIdWithProductId[i];
      const product = await Products.findOne({ id: cartInfo.productId });

      const sub = product.pricing.oldPrice
        ? +product.pricing.discountedPrice * cartInfo.quantity
        : +product.variations.info[
            product.variations.info
              .map((x) => x.id)
              .indexOf(cartInfo.selectedVariationId)
          ].discountedPrice * cartInfo.quantity;
      const tax =
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
      const shipping = product.shippingConfig.freeShiping
        ? 0
        : product.shippingConfig.rate;
      totalValue += sub + tax + shipping;
      subTotal += sub;
      taxTotal += tax;
      totalShipping += shipping;
    }

    const data = {
      totalShipping,
      totalValue: totalValue - +discountedPrice,
      subTotal,
      taxTotal,
      vendorIdWithProductId: order.vendorIdWithProductId,
      createdAt: order.createdAt,
      paymentMode: order.paymentMode,
      addressId: order.addressId,
      discountedPrice,
    };

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
