import { FormEvent, useRef, useState } from "react";
import usePostReq from "../../hooks/usePostReq";
import BtnLoading from "../Loading/BtnLoading";
import ErrorCon from "../Auth/ErrorCon";
import SuccessCon from "../Auth/SuccessCon";
import { nanoid } from "nanoid";

export default function SubscribeNewsletter() {
  const [success, setSuccess] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);

  const { error, execute, loading, setError } = usePostReq(
    "/newsletter/subscribe"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const email = emailRef.current?.value;

    try {
      const res = await execute({ id: nanoid(), email });

      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }

      setSuccess(res.message);
      return setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      console.log(err);

      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <div className="bg-primary py-5">
        <div className="container">
          <div className="d-md-flex gap-2 justify-content-between align-items-center">
            <div className="d-flex flex-column text-light">
              <h3>Subscribe To Our Newsletter</h3>
              <span>
                Subscribe our newsletter for coupon, offer and exciting
                promotional discount.
              </span>
            </div>
            <form onSubmit={handleSubmit} style={{ position: "relative" }}>
              <input
                ref={emailRef}
                type="email"
                className="form-control py-3 w-100 pe-5"
                required
                placeholder="Enter email to subscribe..."
              />
              <button
                type="submit"
                style={{ position: "absolute", right: ".5rem", top: ".7rem" }}
                className="btn p-0"
              >
                {loading ? (
                  <BtnLoading color="dark" />
                ) : (
                  <i className="bi bi-arrow-right-circle-fill fs-4" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
