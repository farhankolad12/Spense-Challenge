import { useNavigate } from "react-router-dom";
import useGetReq from "../../hooks/useGetReq";
import formatCurrency from "../../utils/formatCurrency";
import ErrorCon from "../Message/ErrorCon";

export type Order = {
  id: string;
  customerId: string;
  numberOfProducts: number;
  fullName: string;
  totalValue: number;
  createdAt: number;
};

export default function OrderRow({ order }: { order: Order }) {
  const {
    error,
    loading,
    userData: customerInfo,
  } = useGetReq("/account/get-info", { id: order.customerId });

  const navigate = useNavigate();

  return !loading ? (
    customerInfo && (
      <>
        <ErrorCon error={error} />
        <tr className="text-center">
          <td>{order.id}</td>
          <td>{order.numberOfProducts}</td>
          <td>{customerInfo.fullName}</td>
          <td>{formatCurrency(order.totalValue)}</td>
          <td>{new Date(order.createdAt).toDateString()}</td>
          <td>
            <button
              onClick={() => navigate("/order-detail/" + order.id)}
              className="btn btn-warning p-0 px-2 py-1"
            >
              View
            </button>
          </td>
        </tr>
      </>
    )
  ) : (
    <tr>
      <td>loading</td>
    </tr>
  );
}
