import { Navigate, useParams } from "react-router-dom";
import { ProductType } from "../context/AppContext";
import Product from "../components/Home/Product";
import "../css/products.css";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Auth/ErrorCon";
import { formatStarRating } from "../utils/formatStarRating";

export default function VendorPage() {
  const { id } = useParams();

  const {
    error,
    loading,
    userData: vendor,
  } = useGetReq("/vendors/get-vendor-id", { id });

  const {
    error: _err,
    loading: _loading,
    userData: products,
  } = useGetReq("/products/get-products-vendor", { id });

  const {
    error: __err,
    loading: __loading,
    userData: vendorReviews,
  } = useGetReq("/reviews/vendor-review", { id });

  return !loading && !__loading ? (
    vendor ? (
      <div>
        <ErrorCon error={error} />
        <ErrorCon error={__err} />
        <div style={{ backgroundColor: "#1d2738" }}>
          <div className="container py-5 d-md-flex justify-content-between align-items-center text-light gap-3">
            <div className="d-flex gap-3">
              <div style={{ width: "120px", height: "120px" }}>
                <img
                  className="img-fluid rounded"
                  src={
                    import.meta.env.VITE_APP_API_URL +
                    "/public/uploads/" +
                    vendor.logo
                  }
                  alt="Logo"
                />
              </div>
              <div className="d-flex flex-column">
                <strong>{vendor.storeName}</strong>
                <span>{vendor.address}</span>
                <span className="my-2">{vendor.mobile}</span>
                <span>{vendor.email}</span>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <span>Ratings</span>
              <div className="d-flex gap-2">
                <div>
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    console.log(star);

                    return (
                      <button
                        disabled
                        key={index}
                        style={{ boxShadow: "none", border: "none" }}
                        className="btn p-0"
                      >
                        <i
                          className={`bi bi-star${
                            index <= formatStarRating(vendorReviews)
                              ? "-fill"
                              : ""
                          } text-warning`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span>
                  {vendorReviews && vendorReviews.length >= 2
                    ? formatStarRating(vendorReviews).toFixed(1)
                    : "0.0"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid py-4">
          <h5 className="fw-bold">All Products</h5>
          <div className="products-lists">
            {!_loading
              ? products
                ? products.map((product: ProductType) => {
                    return <Product key={product.id} product={product} />;
                  })
                : "No Products Found!"
              : "loading..."}
          </div>
        </div>
      </div>
    ) : (
      <Navigate to="/" />
    )
  ) : (
    "loading"
  );
}
