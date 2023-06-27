import { ChangeEvent, useState } from "react";
import formatCurrency from "../../utils/formatCurrency";
import usePostReq from "../../hooks/usePostReq";
import ErrorCon from "../Message/ErrorCon";
import SuccessCon from "../Message/SuccessCon";

type SingleVariation = { id: string; name: string; discountedPrice: string };

type SingleStatus = { id: string; heading: string };

export type Info = {
  id: string;
  productImg: string;
  productName: string;
  variationName: string;
  productPricing: { oldPrice: string; discountedPrice: string };
  productVariations: {
    attribute: string;
    info: { id: string; name: string; discountedPrice: string }[];
  };
  quantity: number;
  productTax: number;
  productShipping: number;
  status: SingleStatus[];
  selectedVariationId: string;
  productTotal: number;
  productId: string;
};

export default function OrderDetailRow({ info }: { info: Info }) {
  const [selectDisabled, setSelectDisabled] = useState(false);
  const [success, setSuccess] = useState("");

  const { error, execute, loading, setError } = usePostReq(
    "/orders/change-status"
  );

  async function handleChangeStatus(e: ChangeEvent<HTMLSelectElement>) {
    try {
      const status = e.target.value;
      const res = await execute({
        status,
        id: info.id,
      });

      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }

      if (status.includes("cancelled") || status.includes("delivered")) {
        setSelectDisabled(true);
      }

      setSuccess("Status changed");
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <tr className="text-center">
        <td>
          <img
            src={
              import.meta.env.VITE_APP_API_URL +
              "/public/product/" +
              info.productImg
            }
            alt="Product"
            width="50px"
          />
        </td>
        <td>
          {info.productName.slice(0, 20)}...{" "}
          {info.variationName && `(${info.variationName})`}
        </td>
        <td>
          {formatCurrency(
            info.productPricing.oldPrice
              ? +info.productPricing.discountedPrice
              : +info.productVariations.info[
                  info.productVariations.info
                    .map((x: SingleVariation) => x.id)
                    .indexOf(info.selectedVariationId)
                ].discountedPrice
          )}
        </td>
        <td>{info.quantity}</td>
        <td>{formatCurrency(info.productTax)}</td>
        <td>{formatCurrency(info.productShipping)}</td>
        <td>
          <select
            onChange={(e) => handleChangeStatus(e)}
            disabled={
              info.status.some((stat: SingleStatus) =>
                stat.heading.includes("Cancelled")
              ) ||
              info.status.some((stat: SingleStatus) =>
                stat.heading.includes("Delivered")
              ) ||
              loading ||
              selectDisabled
            }
            defaultValue={
              info.status.some((stat: SingleStatus) =>
                stat.heading.includes("Cancelled")
              )
                ? "order-cancelled"
                : info.status.length === 1
                ? "order-place"
                : info.status.length === 2
                ? "order-confirmed"
                : info.status.length === 3
                ? "order-shipped"
                : info.status.length === 4
                ? "order-delivered"
                : ""
            }
            className="form-select"
          >
            <option value="order-place">Order placed</option>
            <option value="order-confirmed">Confirmed</option>
            <option value="order-shipped">Order shipped</option>
            <option value="order-delivered">Order Delivered</option>
            <option value="order-cancelled">Order cancelled</option>
          </select>
        </td>
        <td>{formatCurrency(info.productTotal)}</td>
      </tr>
    </>
  );
}
