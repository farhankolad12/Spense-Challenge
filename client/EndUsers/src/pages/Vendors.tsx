import { Link } from "react-router-dom";
import TopVendorCom, { Vendor } from "../components/Home/TopVendorCom";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Auth/ErrorCon";

export default function Vendors() {
  const {
    error,
    loading,
    userData: vendors,
  } = useGetReq("/vendors/get-vendors", {});

  return (
    <>
      <ErrorCon error={error} />
      <div className="bg-white">
        <div className="py-2">
          <div className="container">
            <div className="d-flex align-items-center gap-3">
              <Link to="/">
                <i className="bi bi-house fs-5" />
              </Link>
              <span>/</span>
              <span>Vendors</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center my-3 gap-5">
            {!loading
              ? vendors
                ? vendors.map((vendor: Vendor) => {
                    return <TopVendorCom key={vendor.id} vendor={vendor} />;
                  })
                : "No Vendors found"
              : "loading..."}
          </div>
        </div>
      </div>
    </>
  );
}
