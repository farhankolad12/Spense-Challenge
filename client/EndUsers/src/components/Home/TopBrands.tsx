import "../../css/topbrands.css";
import { useNavigate } from "react-router-dom";
import TopBrandCom, { Brand } from "./TopBrandCom";
import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";

export default function TopBrands() {
  const navigate = useNavigate();

  const {
    error,
    loading,
    userData: brands,
  } = useGetReq("/brand/get-brand", {});

  return (
    <>
      <ErrorCon error={error} />
      <div className="bg-white py-3">
        <div className="container-fluid py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Top Brands</h2>
            <button
              onClick={() => navigate("/brands")}
              className="btn btn-primary"
            >
              View More
            </button>
          </div>
          <div className="d-flex align-items-center my-3 gap-5 top-brands-lists">
            {!loading
              ? brands
                ? brands.map((brand: Brand) => {
                    return <TopBrandCom key={brand.id} brand={brand} />;
                  })
                : "No Brands found"
              : "loading..."}
          </div>
        </div>
      </div>
    </>
  );
}
