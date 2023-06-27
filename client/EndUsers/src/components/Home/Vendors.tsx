import "../../css/topbrands.css";
import TopVendorCom, { Vendor } from "./TopVendorCom";
import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";
import { useNavigate } from "react-router-dom";

export default function Vendors() {
  const {
    error,
    loading,
    userData: vendors,
  } = useGetReq("/vendors/get-vendors", {});

  const navigate = useNavigate();

  return (
    <>
      <ErrorCon error={error} />
      <div className="py-5">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Vendors</h2>
            <button
              onClick={() => navigate("/vendors")}
              className="btn btn-primary"
            >
              View More <i className="bi bi-arrow-right" />
            </button>
          </div>
          <div className="d-flex align-items-center gap-5 top-brands-lists">
            {!loading
              ? vendors
                ? vendors.map((vendor: Vendor) => {
                    return <TopVendorCom key={vendor.id} vendor={vendor} />;
                  })
                : "No Vendors found!"
              : "loading"}
          </div>
        </div>
      </div>
    </>
  );
}
