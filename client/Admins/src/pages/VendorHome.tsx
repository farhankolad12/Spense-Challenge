import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import formatCurrency from "../utils/formatCurrency";
import OrderRow, { Order } from "../components/Orders/OrderRow";

export default function VendorHome() {
  const {
    error,
    loading,
    userData: totalOrders,
  } = useGetReq("/orders/vendor-total-orders", {});

  const {
    error: _error,
    loading: _loading,
    userData: totalProducts,
  } = useGetReq("/products/vendor-total-products", {});

  const {
    error: __error,
    loading: __loading,
    userData: totalSales,
  } = useGetReq("/orders/vendor-total-sales", {});

  const {
    error: ___error,
    loading: ___loading,
    userData: orders,
  } = useGetReq("/orders/vendor-products", { limit: 6 });

  return !loading && !_loading && !__loading ? (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={_error} />
      <ErrorCon error={__error} />
      <ErrorCon error={___error} />
      <div
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
        }}
        className="d-md-grid text-light"
      >
        <div className="d-flex justify-content-between align-items-center p-5 bg-success rounded">
          <div className="d-flex flex-column fs-4">
            <h3>{totalOrders}</h3>
            <strong>Total Orders</strong>
          </div>
          <i className="bi bi-cart-fill fs-1" />
        </div>
        <div className="d-flex justify-content-between align-items-center p-5 bg-warning rounded">
          <div className="d-flex flex-column fs-4 text-dark">
            <h3>{totalProducts}</h3>
            <strong>Total Products</strong>
          </div>
          <i className="bi bi-box-seam-fill fs-1 text-dark" />
        </div>
        <div className="d-flex justify-content-between align-items-center p-5 bg-success rounded">
          <div className="d-flex flex-column fs-4">
            <h3>{formatCurrency(totalSales)}</h3>
            <strong>Total Sales</strong>
          </div>
          <i className="bi bi-pie-chart-fill fs-1" />
        </div>
      </div>
      <div className="my-4 bg-white">
        <div className="p-3">
          <h4 className="text-uppercase">new orders</h4>
        </div>
        <div className="table-responsive">
          <table className="table table-striped border">
            <thead>
              <tr className="text-center">
                <th>Order ID</th>
                <th>Number of products</th>
                <th>Customer</th>
                <th>Order total</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!___loading ? (
                orders && orders.length ? (
                  orders.map((order: Order) => {
                    return <OrderRow key={order.id} order={order} />;
                  })
                ) : (
                  <tr>
                    <td>No Orders</td>
                  </tr>
                )
              ) : (
                <tr>
                  <td>loading</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : (
    "loading"
  );
}
