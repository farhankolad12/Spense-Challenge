const express = require("express");
const router = express.Router();

const Orders = require("../../models/orders");
const Products = require("../../models/products");

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

router.get("/vendor-products", checkAuthAdmin, async (req, res) => {
  const currentUser = req.user;
  const { limit } = req.query;
  let orders;

  try {
    if (limit) {
      orders = await Orders.find({
        vendorIdWithProductId: { $elemMatch: { vendorId: currentUser.id } },
      })
        .sort({ createdAt: -1 })
        .limit(limit);
    } else {
      orders = await Orders.find({
        vendorIdWithProductId: { $elemMatch: { vendorId: currentUser.id } },
      }).sort({ createdAt: -1 });
    }

    let data = [];

    for (let j = 0; j < orders.length; j++) {
      const order = orders[j];
      let productInfo;
      let totalValue = 0;
      let numberOfProducts = 0;

      for (let i = 0; i < order.vendorIdWithProductId.length; i++) {
        const o = order.vendorIdWithProductId[i];
        if (o.vendorId === currentUser.id) {
          productInfo = await Products.findOne({ id: o.productId });

          numberOfProducts += o.quantity;

          totalValue += productInfo.pricing.oldPrice
            ? +productInfo.pricing.discountedPrice * o.quantity +
              (productInfo.tax.type === "Percent"
                ? (productInfo.tax.rate / 100) *
                  +productInfo.pricing.discountedPrice *
                  o.quantity
                : productInfo.tax.rate * o.quantity) +
              (productInfo.shippingConfig.freeShiping
                ? 0
                : productInfo.shippingConfig.rate)
            : +productInfo.variations.info[
                productInfo.variations.info
                  .map((x) => x.id)
                  .indexOf(o.selectedVariationId ? o.selectedVariationId : 0)
              ].discountedPrice *
                o.quantity +
              (productInfo.tax.type === "Percent"
                ? (productInfo.tax.rate / 100) *
                  +productInfo.variations.info[
                    productInfo.variations.info
                      .map((x) => x.id)
                      .indexOf(
                        o.selectedVariationId ? o.selectedVariationId : 0
                      )
                  ].discountedPrice *
                  o.quantity
                : productInfo.tax.rate * o.quantity) +
              (productInfo.shippingConfig.freeShiping
                ? 0
                : productInfo.shippingConfig.rate);
        }
      }

      data.push({
        id: order.id,
        numberOfProducts,
        customerId: order.customerId,
        createdAt: order.createdAt,
        totalValue,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
