import { FormEvent, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePostReq from "../hooks/usePostReq";
import ErrorCon from "../components/Auth/ErrorCon";
import { useAuth } from "../context/AuthContext";
import BtnLoading from "../components/Loading/BtnLoading";
import { useApp } from "../context/AppContext";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const {
    setMakeReq,
    setSubTotal,
    setTotalDiscount,
    setTotalShipping,
    setTotalTax,
  } = useApp();
  const { currentUser, authStateChange } = useAuth();

  const { error, execute, loading, setError } = usePostReq("/auth/login");
  const navigate = useNavigate();

  useEffect(() => {
    currentUser ? navigate("/") : "";
  }, [currentUser]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const email = emailRef.current ? emailRef.current.value : "";
    const pass = passRef.current?.value;

    try {
      const res = await execute({ email, password: pass });
      if (res.success === false) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      if (res.navigation) {
        localStorage.setItem("userEmail", email);
        return navigate(res.navigation);
      }
      setSubTotal(0);
      setTotalDiscount(0);
      setTotalShipping(0);
      setTotalTax(0);
      setMakeReq(Math.floor(Math.random() * 99999));
      await authStateChange();
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <div
        className="container px-3"
        style={{ maxWidth: "600px", padding: "7rem 0 4rem 0" }}
      >
        <div className="d-flex flex-column justify-content-center card card-body py-5">
          <h3 className="text-center text-warning fw-bold">Login</h3>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                required
                className="form-control"
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passRef}
                className="form-control"
              />
            </div>
            <div className="d-flex justify-content-between gap-1">
              <div>
                <span>New user ? </span>
                <Link className="link-dark" to="/signup">
                  Create account
                </Link>
              </div>
              <div>
                <Link to="/forget-password" className="text-dark">
                  Forget Password
                </Link>
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary py-3 w-100"
            >
              {loading ? <BtnLoading color="light" /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
