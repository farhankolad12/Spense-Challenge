import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import VendorRow, { Vendor } from "../components/Vendors/VendorRow";

export default function Vendors() {
  const {
    error,
    loading,
    userData: vendors,
  } = useGetReq("/super-admins/vendors", {});

  return (
    <>
      <ErrorCon error={error} />
      <div className="container">
        <div className="bg-white p-4">
          <h3 className="text-uppercase">Vendors</h3>
          {!loading
            ? vendors && (
                <div className="table-responsive my-4">
                  <table className="table border">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.map((vendor: Vendor) => {
                        return <VendorRow vendor={vendor} key={vendor.id} />;
                      })}
                    </tbody>
                  </table>
                </div>
              )
            : "loading..."}
        </div>
      </div>
    </>
  );
}
