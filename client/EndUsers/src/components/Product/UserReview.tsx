import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";

export type Review = {
  id: string;
  customerId: string;
  rating: number;
  comment: string;
  createdAt: number;
};

export default function UserReview({ review }: { review: Review }) {
  const {
    error,
    loading,
    userData: customer,
  } = useGetReq("/account/get-info", { id: review.customerId });

  return (
    <>
      <ErrorCon error={error} />
      {!loading
        ? customer && (
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                <img
                  src={`${import.meta.env.VITE_APP_API_URL}/public${
                    customer.profileImg
                      ? "/uploads/" + customer.profileImg
                      : "/defaultProfile.png"
                  }`}
                  alt="Profile"
                  width="80px"
                  height="80px"
                  className="rounded-circle"
                />
                <div className="d-flex flex-column gap-1">
                  <strong>{customer.fullName}</strong>
                  <div>
                    {[...Array(5)].map((star, index) => {
                      console.log(star);

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
                              index <= review.rating ? "-fill" : ""
                            } fs-5 text-warning`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span>{review.comment}</span>
                </div>
              </div>
              <span>{new Date(review.createdAt).toDateString()}</span>
            </div>
          )
        : "loading..."}
    </>
  );
}
