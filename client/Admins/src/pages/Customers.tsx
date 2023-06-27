import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import CustomerRow, { Customer } from "../components/Customers/CustomerRow";

export default function Customers() {
  const {
    error,
    loading,
    userData: customers,
  } = useGetReq("/super-admins/customers", {});

  return !loading
    ? customers && (
        <>
          <ErrorCon error={error} />
          <div className="container">
            <div className="bg-white p-4">
              <h3 className="text-uppercase">users</h3>
              <div className="table-responsive my-4">
                <table className="table table-striped border">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer: Customer) => {
                      return (
                        <CustomerRow key={customer.id} customer={customer} />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )
    : "loading...";
}
