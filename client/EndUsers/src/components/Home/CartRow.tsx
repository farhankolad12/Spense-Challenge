import { useEffect } from "react";
import useGetReq from "../../hooks/useGetReq";
import usePostReq from "../../hooks/usePostReq";
import { formatCurrency } from "../../utils/formatCurrency";
import ErrorCon from "../Auth/ErrorCon";
import { ProductVariationsInfo, useApp } from "../../context/AppContext";
import { Cart } from "../Cart/CartRowItem";

export default function CartRow({ cart }: { cart: Cart }) {
  const {
    error,
    loading,
    userData: product,
  } = useGetReq("/products/get-product-id", { id: cart.productId });

  const {
    error: _error,
    execute: deleteCart,
    loading: _loading,
    setError: setDeleteErr,
  } = usePostReq("/products/delete-cart");

  const {
    setMakeReq,
    setSubTotal,
    cartItems,
    setTotalTax,
    setTotalShipping,
    setTotalDiscount,
  } = useApp();

  useEffect(() => {
    if (!loading) {
      setSubTotal((prev: number) => {
        return (
          prev +
          (product.pricing.oldPrice
            ? +product.pricing.discountedPrice * cart.quantity
            : +product.variations.info[
                product.variations.info
                  .map((x: ProductVariationsInfo) => x.id)
                  .indexOf(cart.selectedVariationId)
              ].discountedPrice * cart.quantity)
        );
      });
      setTotalTax((prev: number) => {
        return (
          prev +
          (product.pricing.oldPrice
            ? product.tax.type === "Percent"
              ? (product.tax.rate / 100) *
                (+product.pricing.discountedPrice * cart.quantity)
              : product.tax.rate * cart.quantity
            : product.tax.type === "Percent"
            ? (product.tax.rate / 100) *
              (+product.variations.info[
                product.variations.info
                  .map((x: ProductVariationsInfo) => x.id)
                  .indexOf(cart.selectedVariationId)
              ].discountedPrice *
                cart.quantity)
            : product.tax.rate * cart.quantity)
        );
      });
      setTotalShipping((prev: number) => {
        return (
          prev +
          (product.shippingConfig.freeShiping ? 0 : product.shippingConfig.rate)
        );
      });
      setTotalDiscount(() => {
        return cart.couponCode ? cart.couponCode.discountPrice : 0;
      });
    }
  }, [cartItems, loading]);

  async function handleDelete() {
    try {
      const res = await deleteCart({ id: cart.id });
      if (!res.success) {
        setDeleteErr(res.message);
        return setTimeout(() => setDeleteErr(""), 4000);
      }
      await setTotalShipping(0);
      await setTotalTax(0);
      await setSubTotal(0);
      await setTotalDiscount(0);
      await setMakeReq(Math.floor(Math.random() * 99999));
    } catch (err) {
      setDeleteErr("Something went wrong");
      return setTimeout(() => setDeleteErr(""), 4000);
    }
  }

  return !loading ? (
    product ? (
      <div className="d-flex align-items-center gap-3">
        <ErrorCon error={error} />
        <img
          src={
            import.meta.env.VITE_APP_API_URL + "/public/product/" + product.img
          }
          alt="Product"
          width="80px"
          height="100px"
        />
        <div className="d-flex flex-column gap-1 w-100">
          <strong>{product.name.slice(0, 20)}...</strong>
          <span>
            {formatCurrency(
              product.pricing.oldPrice
                ? +product.pricing.discountedPrice
                : +product.variations.info[
                    product.variations.info
                      .map((x: ProductVariationsInfo) => x.id)
                      .indexOf(cart.selectedVariationId)
                  ].discountedPrice,
              "INR"
            )}{" "}
            x {cart.quantity}
          </span>
          <button
            disabled={_loading}
            onClick={handleDelete}
            className="btn me-auto mt-3 text-danger"
          >
            {_loading ? "..." : <i className="bi bi-trash" />}
          </button>
          <div className="ms-auto">
            {formatCurrency(
              product.pricing.oldPrice
                ? +product.pricing.discountedPrice * cart.quantity
                : +product.variations.info[
                    product.variations.info
                      .map((x: ProductVariationsInfo) => x.id)
                      .indexOf(cart.selectedVariationId)
                  ].discountedPrice * cart.quantity,
              "INR"
            )}
          </div>
        </div>
      </div>
    ) : (
      "No product found"
    )
  ) : (
    "loading"
  );
}
