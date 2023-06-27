import AccountNav from "../components/Account/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import useGetReq from "../hooks/useGetReq";
import { formatCurrency } from "../utils/formatCurrency";
import ErrorCon from "../components/Auth/ErrorCon";
import ReviewModal from "../components/Order/ReviewModal";
import { ProductVariationsInfo } from "../context/AppContext";

type Track = {
  id: string;
  heading: string;
  icon: string;
  about: string;
};

export default function TrackOrder() {
  const { id } = useParams();

  const {
    error,
    loading,
    userData: order,
  } = useGetReq("/orders/track-order-id", { id });

  return !loading ? (
    order ? (
      <>
        <ErrorCon error={error} />
        <div className="container py-5">
          <div className="d-md-flex justify-content-center align-items-start gap-5">
            <AccountNav />
            <div className="d-flex flex-column w-100 container mt-md-0 mt-5 border py-3">
              <div className="d-flex align-items-center justify-content-between gap-2">
                <div className="d-flex gap-3 align-items-center">
                  <img
                    src={
                      import.meta.env.VITE_APP_API_URL +
                      "/public/product/" +
                      order.productImg
                    }
                    alt="Product"
                    width="200px"
                    height="150px"
                  />
                  <div className="d-flex flex-column gap-3">
                    <strong>{order.productName}</strong>
                    <span>Qty: {order.quantity}</span>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-primary">
                    {formatCurrency(
                      order.productPricing.oldPrice
                        ? +order.productPricing.discountedPrice * order.quantity
                        : +order.productVariations.info[
                            order.productVariations.info
                              .map((x: ProductVariationsInfo) => x.id)
                              .indexOf(order.selectedVariationId)
                          ].discountedPrice * order.quantity,
                      "INR"
                    )}
                  </span>
                  {!order.productPricing.oldPrice && (
                    <span>
                      {order.productVariations.attribute}:{" "}
                      {
                        order.productVariations.info[
                          order.productVariations.info
                            .map((x: ProductVariationsInfo) => x.id)
                            .indexOf(order.selectedVariationId)
                        ].name
                      }
                    </span>
                  )}
                </div>
              </div>
              {order.track.some((track: Track) => {
                return track.heading.includes("Delivered");
              }) &&
                !order.isReviews && (
                  <div className="ms-auto">
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#reviewModal"
                    >
                      Write a review
                    </button>
                  </div>
                )}
              <div className="d-flex flex-column gap-3 mt-5 mb-3 mx-1">
                {order.track.map((track: Track) => {
                  return (
                    <div
                      key={track.heading}
                      className="d-flex gap-3 align-items-center"
                    >
                      {track.icon ? (
                        <div className="border rounded border-warning px-3">
                          <i
                            className={`bi bi-${track.icon} text-warning`}
                            style={{ fontSize: "4rem" }}
                          />
                        </div>
                      ) : (
                        <div className="border rounded border-danger px-3">
                          <i
                            className={`bi bi-x-lg text-danger`}
                            style={{ fontSize: "4rem" }}
                          />
                        </div>
                      )}
                      <div className="d-flex flex-column">
                        <h4>{track.heading}</h4>
                        <span>{track.about}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {order.track.some((track: Track) => {
          return track.heading.includes("Delivered");
        }) &&
          !order.isReviews && <ReviewModal trackId={id} order={order} />}
      </>
    ) : (
      <Navigate to="/" />
    )
  ) : (
    "loading"
  );
}
