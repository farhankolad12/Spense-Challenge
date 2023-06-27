import "../css/products.css";
import { Link } from "react-router-dom";
import useGetReq from "../hooks/useGetReq";
import TopBrandCom, { Brand } from "../components/Home/TopBrandCom";
import ErrorCon from "../components/Auth/ErrorCon";

export default function Brands() {
  const {
    error,
    loading,
    userData: brands,
  } = useGetReq("/brand/get-brand", {});

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
              <span>Brand</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="d-flex flex-wrap align-items-center my-3 gap-5">
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
