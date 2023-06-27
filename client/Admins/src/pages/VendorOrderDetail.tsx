import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import useGetReq from "../hooks/useGetReq";
import formatCurrency from "../utils/formatCurrency";
import ErrorCon from "../components/Message/ErrorCon";
import OrderDetailRow, { Info } from "../components/Orders/OrderDetailRow";

export default function VendorOrderDetail() {
  const { currentUser } = useAuth();

  const { id } = useParams();

  const {
    error,
    loading,
    userData: order,
  } = useGetReq("/orders/vendor-order-detail", { id });

  return !loading ? (
    order && order.success === false ? (
      <Navigate to="/" />
    ) : (
      <>
        <ErrorCon error={error} />
        <div className="container">
          <h3>Invoice</h3>
          <div className="bg-white p-5 my-4">
            <div className="d-flex justify-content-between gap-3 my-3">
              <div className="d-flex flex-column gap-2">
                <img
                  src={
                    import.meta.env.VITE_APP_API_URL +
                    "/public/uploads/" +
                    currentUser?.logo
                  }
                  alt="Logo"
                  width="150px"
                />
                <strong>{currentUser?.address}</strong>
              </div>
              <div className="d-flex flex-column gap-2">
                <span className="fs-3">Invoice</span>
                <strong># {order.id}</strong>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column gap-2">
                <strong className="mb-4">Bill to</strong>
                <span>{order.firstName + " " + order.lastName}</span>
                <span>{order.email}</span>
                <span>{order.mobile}</span>
                <span>
                  {order.address +
                    " | " +
                    order.landMark +
                    " | " +
                    order.pincode}
                </span>
              </div>
              <div>
                <span>
                  Invoice date:{" "}
                  <strong>{new Date(order.createdAt).toDateString()}</strong>
                </span>
              </div>
            </div>
            <div className="table-responsive my-4">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Tax</th>
                    <th>Shipping Charge</th>
                    <th>Status</th>
                    <th>Order total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.productInfo.map((info: Info) => {
                    return <OrderDetailRow key={info.productId} info={info} />;
                  })}
                </tbody>
              </table>
            </div>
            <div className="d-md-flex gap-5 justify-content-between">
              <div className="d-flex flex-column w-100">
                <span className="fs-3">Payment Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="d-flex flex-column gap-3 w-100">
                <span className="fs-5">Total charge</span>
                <div className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <strong>Subtotal</strong>
                  <strong>{formatCurrency(order.subTotal)}</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <strong>tax</strong>
                  <strong>{formatCurrency(order.tax)}</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <strong>Shipping Charges</strong>
                  <strong>{formatCurrency(order.shippingCharges)}</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <strong>Total</strong>
                  <strong>{formatCurrency(order.total)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  ) : (
    "loading"
  );
}
