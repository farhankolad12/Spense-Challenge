import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

export type Order = {
  id: string;
  paymentMode: string;
  totalValue: number;
  createdAt: number;
  couponCode: { discountPrice: number } | undefined;
  addressId: string;
  productId: string;
  vendorId: string;
  productImg: string;
  productName: string;
};

export default function OrderRow({ order }: { order: Order }) {
  const navigate = useNavigate();

  return (
    <tr className="py-5">
      <td>{order.id}</td>
      <td>{order.paymentMode}</td>
      <td>{formatCurrency(order.totalValue, "INR")}</td>
      <td>{new Date(order.createdAt).toDateString()}</td>
      <td>
        <button
          onClick={() => navigate("/order-detail/" + order.id)}
          className="btn btn-primary px-2 py-1"
        >
          View Order
        </button>
      </td>
    </tr>
  );
}
