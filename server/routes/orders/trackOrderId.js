const express = require("express");
const router = express.Router();

const Orders = require("../../models/orders");
const Reviews = require("../../models/reviews");
const Products = require("../../models/products");

const checkAuth = require("../../middlewares/checkAuth");

router.get("/track-order-id", checkAuth, async (req, res) => {
  const { id } = req.query;
  const currentUser = req.user;

  try {
    const order = await Orders.findOne({
      customerId: currentUser.id,
      vendorIdWithProductId: { $elemMatch: { id: +id } },
    });

    if (order) {
      const currentOrder = await order.vendorIdWithProductId.filter(
        (o) => o.id === +id
      )[0];

      const product = await Products.findOne(
        { id: currentOrder.productId },
        {
          brandName: 0,
          category: 0,
          createdAt: 0,
          description: 0,
          innerSubCategory: 0,
          isFeature: 0,
          isHotDeals: 0,
          shippingConfig: 0,
          shippingTime: 0,
          sku: 0,
          subCategory: 0,
          tags: 0,
          tax: 0,
        }
      );

      const inReviews = await Reviews.findOne({
        customerId: currentUser.id,
        productId: product.id,
        trackId: +id,
        vendorId: product.vendorId,
      });

      const data = {
        productName: product.name,
        productPricing: product.pricing,
        quantity: currentOrder.quantity,
        track: currentOrder.track,
        productVariations: product.variations,
        productImg: product.img,
        productId: product.id,
        vendorId: product.vendorId,
        orderId: order.id,
        isReviews: inReviews ? true : false,
        selectedVariationId: currentOrder.selectedVariationId,
      };

      return res.status(200).json(data);
    }

    return res.status(200).json(undefined);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
