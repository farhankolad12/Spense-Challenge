import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import OrderRow, { Order } from "../components/Orders/OrderRow";

export default function VendorOrders() {
  const {
    error,
    loading,
    userData: orders,
  } = useGetReq("/orders/vendor-products", {});

  return (
    <>
      <ErrorCon error={error} />
      <div className="container">
        <div className="bg-white p-4">
          <span className="fs-4 text-uppercase">Orders</span>
          <form className="d-flex my-3">
            <input
              type="text"
              className="form-control rounded-start-pill"
              placeholder="Type & Enter"
            />
            <button type="submit" className="btn btn-light rounded-start-0">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <div className="table-responsive">
            <table className="table">
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
                {!loading ? (
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
      </div>
    </>
  );
}
