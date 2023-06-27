import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import TopBannerRow, { Banner } from "../components/Sliders/TopBannerRow";

export default function TopBanner() {
  const [makeReq, setMakeReq] = useState(0);

  const navigate = useNavigate();

  const {
    error,
    loading,
    userData: topBanners,
  } = useGetReq("/home-settings/get-top-banner", { makeReq });

  return (
    <>
      <ErrorCon error={error} />
      <div className="container">
        <div className="bg-white p-5">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-uppercase">banners</h3>
            <button
              onClick={() => navigate("/top-banner/add")}
              className="btn btn-secondary"
            >
              Add banner
            </button>
          </div>
          <div className="table-responsive mt-4">
            {!loading
              ? topBanners && (
                  <table className="table table-striped border">
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
                      {topBanners.map((topBanner: Banner) => {
                        return (
                          <TopBannerRow
                            setMakeReq={setMakeReq}
                            key={topBanner.id}
                            topBanner={topBanner}
                            isLargeBanner={undefined}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                )
              : "loading..."}
          </div>
        </div>
      </div>
    </>
  );
}
