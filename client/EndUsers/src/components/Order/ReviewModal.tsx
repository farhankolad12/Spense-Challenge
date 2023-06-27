import { useState, useRef } from "react";
import StarRating from "./StarRating";
import usePostReq from "../../hooks/usePostReq";
import ErrorCon from "../Auth/ErrorCon";
import BtnLoading from "../Loading/BtnLoading";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { Order } from "./OrderRow";

export default function ReviewModal({
  order,
  trackId,
}: {
  order: Order;
  trackId: string | undefined;
}) {
  const [rating, setRating] = useState(0);

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  const { error, execute, loading, setError } = usePostReq(
    "/reviews/add-review"
  );

  async function handleSubmit() {
    const comment = commentRef.current?.value;

    if (!rating) {
      setError("Please select a star!");
      return setTimeout(() => setError(""), 4000);
    }

    try {
      const res = await execute({
        id: nanoid(),
        rating,
        comment,
        trackId,
        productId: order.productId,
        vendorId: order.vendorId,
      });
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      navigate(`/product/${order.productId}`);
    } catch {
      setError("Something went wrong!");
      return setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <div
        className="modal fade"
        id="reviewModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Review
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="text-center justify-content-center align-items-center d-flex flex-column gap-3">
                <img
                  src={
                    import.meta.env.VITE_APP_API_URL +
                    "/public/product/" +
                    order.productImg
                  }
                  alt="Product"
                  width="200px"
                />
                <strong>{order.productName}</strong>
                <StarRating rating={rating} setRating={setRating} />
              </div>
              <label htmlFor="comment" className="mt-4 mb-2">
                Comment
              </label>
              <textarea
                required
                ref={commentRef}
                className="form-control"
                id="comment"
                rows={8}
              />
            </div>
            <div className="modal-footer">
              <button
                onClick={handleSubmit}
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn btn-primary"
              >
                {loading ? <BtnLoading color="light" /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
