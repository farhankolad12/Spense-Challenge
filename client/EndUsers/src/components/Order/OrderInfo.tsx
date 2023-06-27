import { useEffect, useState } from "react";
import useGetReq from "../../hooks/useGetReq";
import { formatCurrency } from "../../utils/formatCurrency";
import ErrorCon from "../Auth/ErrorCon";
import { useNavigate } from "react-router-dom";
import { CartInfo } from "../Account/OrderDetail";
import { Order } from "./OrderRow";
import { ProductVariationsInfo } from "../../context/AppContext";

export default function OrderInfo({
  cartInfo,
  order,
}: {
  cartInfo: CartInfo;
  order: Order;
}) {
  const [pageLoading, setPageLoading] = useState(true);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingTotal, setShippingTotal] = useState(0);

  const totalValue = subTotal + tax + shippingTotal;

  const navigate = useNavigate();

  const {
    error,
    loading,
    userData: product,
  } = useGetReq("/products/get-product-id", { id: cartInfo.productId });

  useEffect(() => {
    if (order?.couponCode) {
      setDiscountedPrice(order.couponCode.discountPrice);
    }
    if (!loading) {
      setSubTotal(
        product.pricing.oldPrice
          ? +product.pricing.discountedPrice * cartInfo.quantity
          : +product.variations.info[
              product.variations.info
                .map((x: ProductVariationsInfo) => x.id)
                .indexOf(cartInfo.selectedVariationId)
            ].discountedPrice * cartInfo.quantity
      );
      setTax(
        product.tax.type === "Percent"
          ? product.pricing.oldPrice
            ? (product.tax.rate / 100) *
              (+product.pricing.discountedPrice * cartInfo.quantity)
            : (product.tax.rate / 100) *
              (+product.variations.info[
                product.variations.info
                  .map((x: ProductVariationsInfo) => x.id)
                  .indexOf(cartInfo.selectedVariationId)
              ].discountedPrice *
                cartInfo.quantity)
          : product.tax.rate * cartInfo.quantity
      );
      setShippingTotal(
        product.shippingConfig.freeShiping ? 0 : product.shippingConfig.rate
      );
      setPageLoading(false);
    }
  }, [order, loading]);

  return !loading && !pageLoading ? (
    <>
      <ErrorCon error={error} />
      <div className="container-fluid py-4 border-bottom">
        <div className="d-flex align-items-center gap-4">
          <img
            width="100px"
            height="150px"
            src={
              import.meta.env.VITE_APP_API_URL +
              "/public/product/" +
              product.img
            }
            alt=""
          />
          <div className="d-flex flex-column gap-4">
            <strong>{product.name}</strong>
            {cartInfo.selectedVariationId && (
              <span>
                {product.variations.attribute}:{" "}
                {
                  product.variations.info[
                    product.variations.info
                      .map((x: ProductVariationsInfo) => x.id)
                      .indexOf(cartInfo.selectedVariationId)
                  ].name
                }
              </span>
            )}
            <span>
              Qty: {cartInfo.quantity} *{" "}
              {formatCurrency(
                product.pricing.oldPrice
                  ? +product.pricing.discountedPrice
                  : +product.variations.info[
                      product.variations.info
                        .map((x: ProductVariationsInfo) => x.id)
                        .indexOf(cartInfo.selectedVariationId)
                    ].discountedPrice,
                "INR"
              )}
            </span>
          </div>
        </div>
        <div className="d-flex flex-wrap my-3 justify-content-center align-items-center gap-5">
          <div className="d-flex flex-column gap-1 text-center">
            <span>Shipping</span>
            <strong>{formatCurrency(shippingTotal, "INR")}</strong>
          </div>
          <div className="d-flex flex-column gap-1 text-center">
            <span>Tax</span>
            <strong>{formatCurrency(tax, "INR")}</strong>
          </div>
          <div className="d-flex flex-column gap-1 text-center">
            <span>Discount</span>
            <strong>{formatCurrency(discountedPrice, "INR")}</strong>
          </div>
          <div className="d-flex flex-column gap-1 text-center">
            <span>Total</span>
            <strong>{formatCurrency(totalValue, "INR")}</strong>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            onClick={() => navigate("/track-order/" + cartInfo.id)}
            className="btn btn-warning"
          >
            Track order
          </button>
        </div>
      </div>
    </>
  ) : (
    "loading..."
  );
}
