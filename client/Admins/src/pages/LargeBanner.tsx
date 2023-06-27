import { useNavigate } from "react-router-dom";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import TopBannerRow, { Banner } from "../components/Sliders/TopBannerRow";
import { useState } from "react";

export default function LargeBanner() {
  const [makeReq, setMakeReq] = useState(0);

  const {
    error,
    loading,
    userData: largeBanner,
  } = useGetReq("/home-settings/get-large-banner", { makeReq });

  const navigate = useNavigate();

  return !loading ? (
    <>
      <ErrorCon error={error} />
      <div className="container">
        <div className="bg-white p-4">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Large Banner</h3>
            <button
              onClick={() => navigate("/large-banner/add")}
              className="btn btn-secondary"
            >
              Add banner
            </button>
          </div>
          {largeBanner && (
            <div className="table-responsive mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Product</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {largeBanner.map((largeBanner: Banner) => {
                    return (
                      <TopBannerRow
                        isLargeBanner={true}
                        setMakeReq={setMakeReq}
                        topBanner={largeBanner}
                        key={largeBanner.id}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    "loading..."
  );
}
