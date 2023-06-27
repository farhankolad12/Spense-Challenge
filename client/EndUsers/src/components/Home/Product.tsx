import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";
import { formatStarRating } from "../../utils/formatStarRating";
import { ProductType } from "../../context/AppContext";

export default function Product({ product }: { product: ProductType }) {
  const {
    error,
    loading,
    userData: reviews,
  } = useGetReq("/reviews/product-review", { id: product.id });

  return (
    <>
      <ErrorCon error={error} />
      {!loading ? (
        <Link
          key={product.id}
          to={"/product/" + product.id}
          className="text-decoration-none text-dark"
        >
          <div className="card px-3 pt-5 pb-3 mt-3">
            <div>
              <img
                src={
                  import.meta.env.VITE_APP_API_URL +
                  "/public/product/" +
                  product.img
                }
                alt="Product"
                width="250px"
                height="300px"
                className="text-center"
              />
              <div className="mt-4">
                <strong>{product.name.slice(0, 20)}...</strong>
                <br />
                <div className="d-flex gap-2 align-items-center">
                  <i className="bi bi-star-fill fs-5" />
                  <strong className="fs-5">
                    {reviews && reviews.length
                      ? formatStarRating(reviews).toFixed(1)
                      : "0.0"}
                  </strong>
                </div>
                <div className="d-flex gap-4 align-items-end">
                  <span className="fs-5 text-primary fw-bold">
                    {product.pricing.oldPrice
                      ? formatCurrency(+product.pricing.discountedPrice, "INR")
                      : formatCurrency(
                          +product.variations.info[0].discountedPrice,
                          "INR"
                        )}
                  </span>
                  <del>
                    <small>
                      {product.pricing.oldPrice
                        ? formatCurrency(+product.pricing.oldPrice, "INR")
                        : formatCurrency(
                            +product.variations.info[0].price,
                            "INR"
                          )}
                    </small>
                  </del>
                </div>
                <span className="badge rounded-pill text-bg-primary px-3 py-2 mt-3">
                  Save{" "}
                  {product.pricing.oldPrice
                    ? formatCurrency(
                        +product.pricing.oldPrice -
                          +product.pricing.discountedPrice,
                        "INR"
                      )
                    : formatCurrency(
                        +product.variations.info[0].price -
                          +product.variations.info[0].discountedPrice,
                        "INR"
                      )}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        "loading"
      )}
    </>
  );
}
