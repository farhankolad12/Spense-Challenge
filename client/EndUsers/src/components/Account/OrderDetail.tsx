import { Navigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";
import AccountNav from "./AccountNav";
import AddressDetail from "../Order/AddressDetail";
import OrderInfo from "../Order/OrderInfo";

export type CartInfo = {
  id: string;
  productId: string;
  quantity: number;
  selectedVariationId: string;
};

export default function OrderDetail() {
  const { id } = useParams();

  const {
    error,
    loading,
    userData: order,
  } = useGetReq("/orders/order-detail", { id });

  return (
    <>
      <ErrorCon error={error} />
      <div className="container py-5">
        <div className="d-md-flex justify-content-center align-items-start gap-5">
          <AccountNav />
          <div className="d-flex flex-column gap-5 w-100 container mt-md-0 mt-5">
            {!loading ? (
              order ? (
                <>
                  <div className="d-flex flex-wrap justify-content-between gap-4 bg-white p-3 align-items-center">
                    <div className="d-flex flex-column">
                      <span>Order ID</span>
                      <strong>{id}</strong>
                    </div>
                    <div className="d-flex flex-column">
                      <span>Date</span>
                      <strong>
                        {new Date(order.createdAt).toDateString()}
                      </strong>
                    </div>
                    <div className="d-flex flex-column">
                      <span>Payment Type</span>
                      <strong>{order.paymentMode}</strong>
                    </div>
                    <div className="d-flex flex-column">
                      <span>Order Amount</span>
                      <strong>{formatCurrency(order.totalValue, "INR")}</strong>
                    </div>
                  </div>
                  <div className="bg-white p-3">
                    <div className="border-bottom">
                      <h3 className="p-2">
                        Order Items {order.vendorIdWithProductId.length}
                      </h3>
                    </div>
                    {order.vendorIdWithProductId.map((cartInfo: CartInfo) => {
                      return (
                        <OrderInfo
                          order={order}
                          cartInfo={cartInfo}
                          key={cartInfo.id}
                        />
                      );
                    })}
                  </div>
                  <div className="border rounded bg-white w-100">
                    <div className="border-bottom">
                      <h5 className="p-3">Total orders</h5>
                    </div>
                    <div className="d-flex justify-content-between gap-4 border-bottom p-3">
                      <span>Subtotal</span>
                      <span>{formatCurrency(order.subTotal, "INR")}</span>
                    </div>
                    <div className="d-flex justify-content-between gap-4 border-bottom p-3">
                      <span>Tax</span>
                      <span>{formatCurrency(order.taxTotal, "INR")}</span>
                    </div>
                    <div className="d-flex justify-content-between gap-4 border-bottom p-3">
                      <span>Shipping</span>
                      <span>{formatCurrency(order.totalShipping, "INR")}</span>
                    </div>
                    <div className="d-flex justify-content-between gap-4 border-bottom p-3">
                      <span>Discount</span>
                      <span>
                        {" "}
                        {order.discountedPrice
                          ? `- ${formatCurrency(order.discountedPrice, "INR")}`
                          : `- ${formatCurrency(0, "INR")}`}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between gap-4 p-3">
                      <strong>Total</strong>
                      <strong>{formatCurrency(order.totalValue, "INR")}</strong>
                    </div>
                  </div>
                  {order && <AddressDetail order={order} />}
                </>
              ) : (
                <Navigate to="/" />
              )
            ) : (
              "loading"
            )}
          </div>
        </div>
      </div>
    </>
  );
}
