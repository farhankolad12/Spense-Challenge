import useGetReq from "../../hooks/useGetReq";
import usePostReq from "../../hooks/usePostReq";
import { formatCurrency } from "../../utils/formatCurrency";
import ErrorCon from "../Auth/ErrorCon";
import BtnLoading from "../Loading/BtnLoading";
import { ProductVariationsInfo, useApp } from "../../context/AppContext";

export type Cart = {
  id: string;
  productId: string;
  quantity: number;
  selectedVariationId: string;
  couponCode: { id: string; cname: string; discountPrice: number } | undefined;
};

export default function CartRowItem({ item }: { item: Cart }) {
  const {
    error,
    loading,
    userData: product,
  } = useGetReq("/products/get-product-id", { id: item.productId });

  const {
    error: cartErr,
    execute: deleteCart,
    loading: cartLoading,
    setError,
  } = usePostReq("/products/delete-cart");

  const {
    setMakeReq,
    setTotalShipping,
    setTotalTax,
    setSubTotal,
    setTotalDiscount,
  } = useApp();

  async function handleDelete() {
    try {
      const res = await deleteCart({ id: item.id });
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      await setTotalShipping(0);
      await setTotalTax(0);
      await setSubTotal(0);
      await setTotalDiscount(0);
      await setMakeReq(Math.floor(Math.random() * 99999));
    } catch (err) {
      setError("Something went wrong");
      return setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <tr className="border-none">
      {!loading ? (
        <>
          <ErrorCon error={error} />
          <ErrorCon error={cartErr} />
          <td className="d-md-flex gap-4">
            <img
              src={
                import.meta.env.VITE_APP_API_URL +
                "/public/product/" +
                product.img
              }
              alt="Product"
              width="100px"
            />
            <div className="d-flex flex-column gap-2 mt-4">
              <strong>{product.name}</strong>
              <span className="text-primary">
                Price:{" "}
                {formatCurrency(
                  product.pricing.oldPrice
                    ? +product.pricing.discountedPrice
                    : +product.variations.info[
                        product.variations.info
                          .map((x: ProductVariationsInfo) => x.id)
                          .indexOf(item.selectedVariationId)
                      ].discountedPrice,
                  "INR"
                )}
              </span>
            </div>
          </td>
          <td>
            <input
              type="text"
              disabled
              defaultValue={item.quantity}
              className="form-control w-auto mt-4"
            />
          </td>
          <td>
            <div className="mt-4">
              {formatCurrency(
                product.pricing.oldPrice
                  ? +product.pricing.discountedPrice * item.quantity
                  : +product.variations.info[
                      product.variations.info
                        .map((x: ProductVariationsInfo) => x.id)
                        .indexOf(item.selectedVariationId)
                    ].discountedPrice * item.quantity,
                "INR"
              )}
            </div>
          </td>
          <td>
            <div className="mt-4">
              {formatCurrency(
                product.pricing.oldPrice
                  ? product.tax.type === "Percent"
                    ? (product.tax.rate / 100) *
                      +product.pricing.discountedPrice *
                      item.quantity
                    : product.tax.rate * item.quantity
                  : product.tax.type === "Percent"
                  ? (product.tax.rate / 100) *
                    +product.variations.info[
                      product.variations.info
                        .map((x: ProductVariationsInfo) => x.id)
                        .indexOf(item.selectedVariationId)
                    ].discountedPrice *
                    item.quantity
                  : product.tax.rate * item.quantity,
                "INR"
              )}
            </div>
          </td>
          <td>
            <div className="mt-4">
              {product.shippingConfig.freeShiping
                ? "Free"
                : formatCurrency(product.shippingConfig.rate, "INR")}
            </div>
          </td>
          <td>
            <div className="mt-4">
              {formatCurrency(
                product.pricing.oldPrice
                  ? +product.pricing.discountedPrice * item.quantity +
                      (product.tax.type === "Percent"
                        ? (product.tax.rate / 100) *
                          +product.pricing.discountedPrice *
                          item.quantity
                        : product.tax.rate * item.quantity) +
                      (product.shippingConfig.freeShiping
                        ? 0
                        : product.shippingConfig.rate)
                  : +product.variations.info[
                      product.variations.info
                        .map((x: ProductVariationsInfo) => x.id)
                        .indexOf(item.selectedVariationId)
                    ].discountedPrice *
                      item.quantity +
                      (product.tax.type === "Percent"
                        ? (product.tax.rate / 100) *
                          +product.variations.info[
                            product.variations.info
                              .map((x: ProductVariationsInfo) => x.id)
                              .indexOf(item.selectedVariationId)
                          ].discountedPrice *
                          item.quantity
                        : product.tax.rate * item.quantity) +
                      (product.shippingConfig.freeShiping
                        ? 0
                        : product.shippingConfig.rate),
                "INR"
              )}
            </div>
          </td>
          <td>
            <button
              onClick={handleDelete}
              disabled={cartLoading}
              className="btn btn-light mt-3 rounded-circle"
            >
              {cartLoading ? (
                <BtnLoading color="danger" />
              ) : (
                <i className="bi bi-trash text-danger" />
              )}
            </button>
          </td>
        </>
      ) : (
        "loading..."
      )}
    </tr>
  );
}
