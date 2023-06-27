import { FormEvent, useRef, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "./ErrorCon";
import usePostReq from "../../hooks/usePostReq";
import { useAuth } from "../../context/AuthContext";
import BtnLoading from "../Loading/BtnLoading";

export default function VerifyOtp() {
  const [isVerified, setIsVerified] = useState(false);
  const [success, setSuccess] = useState("");

  const email: string | null = localStorage.getItem("userEmail");

  const { error, loading, userData } = useGetReq("/auth/check-email", {
    email,
  });
  const {
    error: otpError,
    loading: otpLoading,
    execute,
    setError,
  } = usePostReq("/auth/check-otp");
  const {
    error: resendErr,
    loading: resendLoading,
    execute: resendEmail,
    setError: resendSetErr,
  } = usePostReq("/auth/resend-email");
  const { currentUser } = useAuth();

  const otpRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const otp = otpRef.current?.value;

    if (otp === "") return;

    try {
      const res = await execute({ otp, email });
      if (res.success) {
        return setIsVerified(true);
      }
      setError(res.message);
      return setTimeout(() => setError(""), 4000);
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
      return setTimeout(() => setError(""), 4000);
    }
  }

  async function handleResend() {
    try {
      const res = await resendEmail({ email });
      if (res.success) {
        setSuccess("Email send to registered email!");
        return setTimeout(() => setSuccess(""), 4000);
      }
      resendSetErr(res.message);
      return setTimeout(() => resendSetErr(""), 4000);
    } catch (err) {
      console.log(err);
      resendSetErr("Something went wrong!");
      return setTimeout(() => resendSetErr(""), 4000);
    }
  }

  return !loading ? (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={otpError} />
      <ErrorCon error={resendErr} />
      <ErrorCon error={success} />
      {userData?.alreadyExists && !isVerified ? (
        <div
          className="container px-3"
          style={{ maxWidth: "600px", padding: "7rem 0 4rem 0" }}
        >
          <div className="d-flex flex-column justify-content-center card card-body py-5">
            <h3 className="text-center text-warning fw-bold">
              OTP Verification
            </h3>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-1">
                <input
                  type="email"
                  id="email"
                  value={email?.toString()}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <input
                  type="number"
                  id="otp"
                  required
                  className="form-control"
                  placeholder="Verification code"
                  ref={otpRef}
                />
              </div>
              <div>
                <span className="d-flex gap-2">
                  Email not receive?{" "}
                  <button
                    disabled={resendLoading}
                    onClick={handleResend}
                    className="btn btn-white p-0 border-none"
                  >
                    {resendLoading ? "loading..." : "resend"}
                  </button>
                </span>
              </div>
              <button
                disabled={otpLoading}
                type="submit"
                className="btn btn-primary py-3 w-100"
              >
                {otpLoading ? <BtnLoading color="light" /> : "Verify"}
              </button>
            </form>
          </div>
        </div>
      ) : isVerified ? (
        <div className="d-flex flex-column gap-2 text-center py-5">
          <h3>Successfully register</h3>
          <Link to="/login">Login</Link>
        </div>
      ) : (
        <>
          {localStorage.clear()}
          <Navigate to="/login" />
        </>
      )}
    </>
  ) : (
    "Loading..."
  );
}
