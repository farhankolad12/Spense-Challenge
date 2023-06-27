const express = require("express");
const router = express.Router();

const Orders = require("../../models/orders");
const Products = require("../../models/products");

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

router.get("/vendor-total-orders", checkAuthAdmin, async (req, res) => {
  const currentUser = req.user;

  try {
    const data = await Orders.count({
      vendorIdWithProductId: { $elemMatch: { vendorId: currentUser.id } },
    });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/vendor-total-sales", checkAuthAdmin, async (req, res) => {
  const currentUser = req.user;

  try {
    let totalSales = 0;

    const order = await Orders.find({
      vendorIdWithProductId: { $elemMatch: { vendorId: currentUser.id } },
    });

    const vendorOrders = order.map((ord) => {
      return ord.vendorIdWithProductId.filter(
        (o) => o.vendorId === currentUser.id
      );
    });

    for (let i = 0; i < vendorOrders.length; i++) {
      const productOrder = vendorOrders[i];
      let total = 0;
      for (let j = 0; j < productOrder.length; j++) {
        const vendorOrder = productOrder[j];
        const product = await Products.findOne({ id: vendorOrder.productId });
        total += product.pricing.oldPrice
          ? +product.pricing.discountedPrice * vendorOrder.quantity
          : +product.variations.info[
              product.variations.info
                .map((x) => x.id)
                .indexOf(vendorOrder.selectedVariationId)
            ].discountedPrice * vendorOrder.quantity;
      }
      totalSales += total;
    }
    return res.status(200).json(totalSales);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
