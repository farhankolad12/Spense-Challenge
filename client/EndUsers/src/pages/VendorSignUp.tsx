import { FormEvent, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePostReq from "../hooks/usePostReq";
import ErrorCon from "../components/Auth/ErrorCon";
import BtnLoading from "../components/Loading/BtnLoading";
import { useAuth } from "../context/AuthContext";
import { nanoid } from "nanoid";

export default function VendorSignUp() {
  const [success, setSuccess] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { error, execute, loading, setError } = usePostReq(
    "/auth/vendor-signup"
  );
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current ? emailRef.current.value : "";
    const mobile = mobileRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password !== confirmPassword) {
      setError("Password don't match");
      return setTimeout(() => setError(""), 4000);
    }

    try {
      const res = await execute({
        id: nanoid(),
        firstName,
        lastName,
        email,
        mobile,
        password,
      });
      if (res.success) {
        setSuccess(true);
      }
      setError(res.message);
      return setTimeout(() => setError(""), 4000);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
      return setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      {success ? (
        <div className="container text-center">
          <h3>Succesfully Registered</h3>
          <Link to={import.meta.env.VITE_APP_ADMIN_URL}></Link>
        </div>
      ) : (
        <div
          className="container px-3"
          style={{ maxWidth: "800px", padding: "7rem 0 4rem 0" }}
        >
          <div className="d-flex flex-column justify-content-center card card-body py-5">
            <h3 className="text-center text-warning fw-bold">Create Account</h3>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputFname4" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  ref={firstNameRef}
                  className="form-control"
                  id="inputFname4"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLName4" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  ref={lastNameRef}
                  className="form-control"
                  id="inputLName4"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail1" className="form-label">
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  className="form-control"
                  id="inputEmail1"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <input
                  ref={mobileRef}
                  type="text"
                  className="form-control"
                  id="mobile"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="confirm-password" className="form-label">
                  Confirm Password
                </label>
                <input
                  ref={confirmPasswordRef}
                  type="password"
                  className="form-control"
                  id="confirm-password"
                />
              </div>
              <div className="col-12 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    I accept the{" "}
                    <Link className="text-decoration-underline" to="/terms">
                      Terms & conditions
                    </Link>
                  </label>
                </div>
                <span>
                  Already have a account?{" "}
                  <Link
                    className="fw-bold"
                    to={import.meta.env.VITE_APP_ADMIN_URL + "/"}
                    target="_blank"
                  >
                    Signin
                  </Link>
                </span>
              </div>
              <div className="col-12">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary py-3 w-100"
                >
                  {loading ? <BtnLoading color="light" /> : "Signup"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
