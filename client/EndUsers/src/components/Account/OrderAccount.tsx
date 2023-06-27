import { useNavigate } from "react-router-dom";
import AccountNav from "./AccountNav";
import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";
import OrderRow, { Order } from "../Order/OrderRow";

export default function OrderAccount() {
  const navigate = useNavigate();

  const {
    error,
    loading,
    userData: orders,
  } = useGetReq("/orders/user-orders", {});

  return (
    <>
      <ErrorCon error={error} />
      <div className="container py-5">
        <div className="d-md-flex justify-content-center align-items-start gap-5">
          <AccountNav />
          <div className="d-flex flex-column gap-3 w-100 container mt-md-0 mt-5">
            {!loading ? (
              orders && orders.length ? (
                <div className="card card-body bg-white">
                  <h4 className="pt-1 pb-3 px-2 border-bottom">Total Orders</h4>
                  <div className="table-responsive w-100">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="col ">Order ID</th>
                          <th className="col">Payment type</th>
                          <th className="col">Price</th>
                          <th className="col">Date</th>
                          <th className="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order: Order) => {
                          return <OrderRow order={order} key={order.id} />;
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-white p-5">
                    <img
                      src="https://gravityinfotech.net/project/e-com/storage/app/public/images/no-data.png"
                      alt="No data"
                      width="100%"
                    />
                  </div>
                  <h3>No Orders</h3>
                  <span>
                    <span className="text-warning">Woops!</span>
                    Orders not found!
                  </span>
                  <button
                    onClick={() => navigate("/")}
                    className="btn btn-primary"
                  >
                    Go to home page
                  </button>
                </>
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
