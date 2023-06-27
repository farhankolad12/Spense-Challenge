const express = require("express");
const router = express.Router();

const checkAuth = require("../../middlewares/checkAuth");

const Coupons = require("../../models/coupons");
const Cart = require("../../models/cart");
const Products = require("../../models/products");

router.post("/check-coupon", checkAuth, async (req, res) => {
  const currentUser = req.user;
  const { coupon } = req.body;

  try {
    const isExists = await Coupons.findOne({ name: coupon });
    const currentTime = Date.now();

    if (
      isExists &&
      isExists.startDate <= currentTime &&
      isExists.endDate >= currentTime
    ) {
      const userCart = await Cart.find({ uid: currentUser.id });

      let totalCartBalance = 0;

      for (let i = 0; i < userCart.length; i++) {
        const cartItem = userCart[i];
        const product = await Products.findOne({
          id: cartItem.productId,
        });
        const price = product.pricing.oldPrice
          ? +product.pricing.discountedPrice * cartItem.quantity +
            (product.tax.type === "Percent"
              ? (product.tax.rate / 100) *
                +product.pricing.discountedPrice *
                cartItem.quantity
              : product.tax.rate * cartItem.quantity) +
            (product.shippingConfig.freeShiping
              ? 0
              : product.shippingConfig.rate)
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
        totalCartBalance += price;
      }

      if (totalCartBalance >= +isExists.minimumAmount) {
        const userCoupon = {
          cid: isExists.id,
          cname: isExists.name,
          discountPrice:
            isExists.type === "percent"
              ? (+isExists.amount / 100) * totalCartBalance
              : +isExists.amount,
        };
        if (isExists.usagePerUser === "limited") {
          if (+isExists.perUser > 0) {
            await Cart.updateMany(
              { uid: currentUser.id },
              { $set: { couponCode: userCoupon } }
            );
            return res.status(200).json({ success: true });
          } else {
            return res.status(409).json({
              success: false,
              message: `Invalid or expire code!`,
            });
          }
        }
        await Cart.updateMany(
          { uid: currentUser.id },
          { $set: { couponCode: userCoupon } }
        );
        return res.status(200).json({ success: true });
      }
      return res.status(409).json({
        success: false,
        message: `Minimum amount for this code is ${isExists.minimumAmount}`,
      });
    }
    return res.status(409).json({
      success: false,
      message: `Invalid or expire code!`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
