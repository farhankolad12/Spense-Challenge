const express = require("express");
const router = express.Router();

const Orders = require("../../models/orders");
const Address = require("../../models/address");
const Products = require("../../models/products");
const Customers = require("../../models/endusers");

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

router.get("/vendor-order-detail", checkAuthAdmin, async (req, res) => {
  const currentUser = req.user;
  const { id } = req.query;

  try {
    const order = await Orders.findOne({
      id,
      vendorIdWithProductId: { $elemMatch: { vendorId: currentUser.id } },
    });

    const productsOrder = order.vendorIdWithProductId.filter(
      (o) => o.vendorId === currentUser.id
    );

    let subTotal = 0;
    let tax = 0;
    let shippingCharges = 0;

    let productInfo = [];

    for (let i = 0; i < productsOrder.length; i++) {
      const productOrder = productsOrder[i];

      const product = await Products.findOne({ id: productOrder.productId });

      const productSubTotal = product.pricing.oldPrice
        ? +product.pricing.discountedPrice * productOrder.quantity
        : +product.variations.info[
            product.variations.info
              .map((x) => x.id)
              .indexOf(productOrder.selectedVariationId)
          ].discountedPrice * productOrder.quantity;

      subTotal += productSubTotal;

      const productTax = product.pricing.oldPrice
        ? product.tax.type === "Percent"
          ? (product.tax.rate / 100) *
            +product.pricing.discountedPrice *
            productOrder.quantity
          : product.tax.rate * productOrder.quantity
        : product.tax.type === "Percent"
        ? (product.tax.rate / 100) *
          +product.variations.info[
            product.variations.info
              .map((x) => x.id)
              .indexOf(productOrder.selectedVariationId)
          ].discountedPrice *
          productOrder.quantity
        : product.tax.rate * productOrder.quantity;

      tax += productTax;

      const productShipping = product.shippingConfig.freeShiping
        ? 0
        : +product.shippingConfig.rate;

      shippingCharges += productShipping;

      productInfo.push({
        productId: product.id,
        productImg: product.img,
        productName: product.name,
        productPricing: product.pricing,
        productVariations: product.variations,
        quantity: productOrder.quantity,
        productTax,
        productShipping,
        productTotal: productSubTotal + productTax + productShipping,
        status: productOrder.track,
        id: productOrder.id,
        selectedVariationId: productOrder.selectedVariationId,
        variationName: !product.pricing.oldPrice
          ? product.variations.info[
              product.variations.info
                .map((x) => x.id)
                .indexOf(productOrder.selectedVariationId)
            ].name
          : "",
      });
    }

    const address = await Address.findOne({
      uid: order.customerId,
      address: { $elemMatch: { id: order.addressId } },
    });

    const customerAddress = address.address.filter(
      (addr) => addr.id === order.addressId
    )[0];

    const total = subTotal + tax + shippingCharges;

    const data = {
      id: order.id,
      ...customerAddress,
      paymentMethod: order.paymentMode,
      orderNote: order.orderNote,
      productInfo,
      createdAt: order.createdAt,
      subTotal,
      tax,
      shippingCharges,
      total,
    };

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
