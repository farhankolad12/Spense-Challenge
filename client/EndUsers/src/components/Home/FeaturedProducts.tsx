import "../../css/products.css";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../context/AppContext";
import useGetReq from "../../hooks/useGetReq";
import Product from "./Product";
import ErrorCon from "../Auth/ErrorCon";

export default function FeaturedProducts() {
  const navigate = useNavigate();

  const {
    error,
    loading,
    userData: products,
  } = useGetReq("/products/get-featured-products", {});

  return (
    <>
      <ErrorCon error={error} />
      <div className="container-fluid">
        <div className="d-flex justify-content-between">
          <h2 className="fw-bold">Featured Products</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/feature-products")}
          >
            View more <i className="bi bi-arrow-right" />
          </button>
        </div>
        <div className="products-lists">
          {!loading
            ? products
              ? products.map((product: ProductType) => {
                  return <Product key={product.id} product={product} />;
                })
              : "No Products found"
            : "loading..."}
        </div>
      </div>
    </>
  );
}
