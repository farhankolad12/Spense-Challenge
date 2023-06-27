import "../css/productPage.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { useAuth } from "../context/AuthContext";
import { nanoid } from "nanoid";
import { ProductVariationsInfo, useApp } from "../context/AppContext";
import { formatStarRating } from "../utils/formatStarRating";
import useGetReq from "../hooks/useGetReq";
import usePostReq from "../hooks/usePostReq";
import ErrorCon from "../components/Auth/ErrorCon";
import SuccessCon from "../components/Auth/SuccessCon";
import BtnLoading from "../components/Loading/BtnLoading";
import UserReview, { Review } from "../components/Product/UserReview";
import { Wishlist } from "../components/Account/Wishlist";

export default function ProductPage() {
  const [success, setSuccess] = useState("");
  const [getWishlistAgain, setGetWishlistAgain] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const {
    setMakeReq,
    setSubTotal,
    setTotalShipping,
    setTotalTax,
    setTotalDiscount,
  } = useApp();

  const {
    error,
    loading,
    userData: product,
  } = useGetReq("/products/get-product-id", { id });

  const [selectedVariation, setSelectedVariations] =
    useState<ProductVariationsInfo>({
      id: "",
      discountedPrice: "",
      name: "",
      price: "",
    });

  useEffect(() => {
    if (product && product.variations.attribute) {
      setSelectedVariations(product.variations.info[0]);
    }
  }, [product]);

  const {
    error: cartError,
    execute: addToCart,
    loading: cartLoading,
    setError: setCartError,
  } = usePostReq("/products/add-cart");

  const {
    error: wishErr,
    execute: addToWishlist,
    loading: wishLoading,
    setError: setWishErr,
  } = usePostReq("/products/add-wishlist");

  const {
    error: getWishErr,
    loading: getWishLoading,
    userData: wishlists,
  } = useGetReq("/products/get-wishlist", { makeReq: getWishlistAgain });

  const {
    error: reviewErr,
    loading: reviewLoading,
    userData: reviews,
  } = useGetReq("/reviews/product-review", { id });

  const {
    error: vendorReviewsErr,
    loading: vendorReviewsLoading,
    userData: vendorReviews,
  } = useGetReq("/reviews/vendor-review", {
    id: product?.vendorId,
    makeReq: product,
  });

  async function handleCart() {
    try {
      const res = await addToCart({
        id,
        cartId: nanoid(),
        selectedVariationId: selectedVariation.id,
      });
      if (!res.success) {
        setCartError(res.message);
        return setTimeout(() => setCartError(""), 4000);
      }
      await setSubTotal(0);
      await setTotalShipping(0), await setTotalTax(0);
      await setTotalDiscount(0);
      await setMakeReq(Math.floor(Math.random() * 9999999));
      setSuccess("Added to cart!");
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setCartError("Something went wrong");
      return setTimeout(() => setCartError(""), 4000);
    }
  }

  async function handleWishlist() {
    try {
      const res = await addToWishlist({ id, wishId: nanoid() });
      if (!res.success) {
        setWishErr(res.message);
        return setTimeout(() => setWishErr(""), 4000);
      }
      setGetWishlistAgain(Math.floor(Math.random() * 99999));
      setSuccess("Operation done on wishlist!");
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setWishErr("Something went wrong");
      return setTimeout(() => setWishErr(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={cartError} />
      <ErrorCon error={getWishErr} />
      <ErrorCon error={wishErr} />
      <ErrorCon error={reviewErr} />
      <ErrorCon error={vendorReviewsErr} />
      <SuccessCon success={success} />
      {!loading && !reviewLoading && !vendorReviewsLoading ? (
        product ? (
          <div className="bg-white product-page">
            <div className="py-2">
              <div className="container">
                <div className="d-flex align-items-center gap-3">
                  <Link to="/">
                    <i className="bi bi-house fs-5" />
                  </Link>
                  <span>/</span>
                  <span>{product.name}</span>
                </div>
              </div>
            </div>
            <div className="container d-md-flex justify-content-center gap-5 my-5">
              <div>
                <img
                  width="100%"
                  height="600px"
                  src={
                    import.meta.env.VITE_APP_API_URL +
                    "/public/product/" +
                    product.img
                  }
                  alt="Product Img"
                />
              </div>
              <div className="product-info">
                <div>
                  <Link
                    to={
                      "/categories/" +
                      product.category.name +
                      "/" +
                      product.subCategory.name +
                      "/" +
                      product.innerSubCategory.name
                    }
                    className="text-dark d-flex gap-1"
                  >
                    <span>{product.category.name} |</span>
                    <span>{product.subCategory.name} |</span>
                    <span>{product.innerSubCategory.name}</span>
                  </Link>
                </div>
                <h1 className="fw-bold">{product.name}</h1>
                <div className="d-flex gap-2">
                  {reviews.length ? (
                    <>
                      <div>
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              type="button"
                              key={index}
                              className="btn p-0"
                              style={{ boxShadow: "none", border: "none" }}
                              disabled
                            >
                              <i
                                className={`bi bi-star${
                                  index <= formatStarRating(reviews)
                                    ? "-fill"
                                    : ""
                                } fs-5 text-warning`}
                              />
                            </button>
                          );
                        })}
                      </div>
                      <span>{formatStarRating(reviews).toFixed(1)}</span>
                    </>
                  ) : (
                    ""
                  )}
                  <span>({reviews.length} Reviews)</span>
                </div>
                <div className="d-flex gap-4 my-3">
                  <h3 className="fw-bold">
                    {product.pricing.discountedPrice
                      ? formatCurrency(+product.pricing.discountedPrice, "INR")
                      : formatCurrency(
                          +selectedVariation.discountedPrice,
                          "INR"
                        )}
                  </h3>
                  <strong className="fw-bold">
                    <del>
                      {product.pricing.oldPrice
                        ? formatCurrency(+product.pricing.oldPrice, "INR")
                        : formatCurrency(+selectedVariation.price, "INR")}
                    </del>
                  </strong>
                </div>
                <span>
                  {product.tax.type === "Percent"
                    ? formatCurrency(
                        (product.tax.rate *
                          (product.pricing.discountedPrice
                            ? +product.pricing.discountedPrice
                            : +selectedVariation.discountedPrice)) /
                          100,
                        "INR"
                      )
                    : formatCurrency(product.tax.rate, "INR")}{" "}
                  Additional tax
                </span>
                <div className="my-3">
                  {product.variations.attribute ? (
                    <div className="d-flex gap-3 align-items-center">
                      <span>{product.variations.attribute}</span>
                      {product.variations.info.map(
                        (variation: ProductVariationsInfo) => {
                          return (
                            <button
                              onClick={() => setSelectedVariations(variation)}
                              key={variation.name}
                              className={`btn border p-0 px-3 py-2 ${
                                selectedVariation.id === variation.id
                                  ? "border-dark"
                                  : ""
                              }`}
                            >
                              {variation.name}
                            </button>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="d-flex flex-column gap-2 variation-info ">
                  <div className="d-flex justify-content-between">
                    <strong>Sku</strong>
                    <span>{product.sku}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <strong>Shiiping Time</strong>
                    <span>{product.shippingTime} days</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <strong>Shipping Charge</strong>
                    <span>
                      {product.shippingConfig.freeShiping
                        ? "Free"
                        : formatCurrency(+product.shippingConfig.rate, "INR")}
                    </span>
                  </div>
                  {vendorReviews && (
                    <div className="d-flex justify-content-between align-items-center">
                      <strong>Seller</strong>
                      <div className="d-flex flex-column">
                        <span>{vendorReviews[vendorReviews.length - 1]}</span>
                        <span>
                          <i className="bi bi-star-fill " />{" "}
                          {vendorReviews && vendorReviews.length > 1
                            ? formatStarRating(vendorReviews).toFixed(1)
                            : "0.0"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="d-flex my-4 gap-4">
                  <button
                    disabled={cartLoading}
                    onClick={
                      currentUser ? handleCart : () => navigate("/login")
                    }
                    className="btn btn-dark py-3 fw-bold"
                  >
                    {cartLoading ? (
                      <BtnLoading color="light" />
                    ) : (
                      <>
                        Add to cart <i className="bi bi-cart fs-6" />
                      </>
                    )}
                  </button>
                  <button
                    onClick={
                      currentUser ? handleWishlist : () => navigate("/login")
                    }
                    className="btn btn-light py-3 fw-bold"
                  >
                    {wishLoading || getWishLoading ? (
                      <BtnLoading color="dark" />
                    ) : wishlists ? (
                      <>
                        Wishlist{" "}
                        <i
                          className={`bi bi-heart${
                            wishlists &&
                            wishlists.length &&
                            wishlists.some(
                              (list: Wishlist) => list.productId === product.id
                            )
                              ? "-fill"
                              : ""
                          } fs-6`}
                        />
                      </>
                    ) : (
                      <>
                        Wishlist <i className="bi bi-heart fs-6" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="container d-flex flex-column justify-content-center my-5">
              <ul className="nav nav-pills mb-3 " id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Reviews
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex={0}
                >
                  {product.description}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                  tabIndex={0}
                >
                  <div>
                    <h3>{reviews.length} Reviews</h3>
                    <div className="d-flex flex-column gap-4 my-4">
                      {reviews.map((review: Review) => {
                        return <UserReview key={review.id} review={review} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          "No Product Found"
        )
      ) : (
        "loading..."
      )}
    </>
  );
}
