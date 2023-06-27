import { Link, useParams } from "react-router-dom";
import Product from "../Home/Product";
import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";
import { ProductType } from "../../context/AppContext";

export default function BrandPage() {
  const { name } = useParams();

  const {
    error,
    loading,
    userData: products,
  } = useGetReq("/products/get-products-brand", { name });

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
              <span>{name}</span>
            </div>
          </div>
        </div>
        <div className="container-fluid my-4">
          <div className="d-flex justify-content-end">
            <select className="form-select w-auto">
              <option value="rating-high">Rating: High to Low</option>
              <option value="rating-low">Rating: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
          <div className="products-lists">
            {!loading
              ? products
                ? products.map((product: ProductType) => {
                    return <Product key={product.id} product={product} />;
                  })
                : "No Products Found!"
              : "loading..."}
          </div>
        </div>
      </div>
    </>
  );
}
