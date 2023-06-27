import { FormEvent, useRef, useEffect } from "react";
import ErrorCon from "../components/Message/ErrorCon";
import usePostReq from "../hooks/usePostReq";
import BtnLoading from "../components/Message/BtnLoading";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { error, execute, loading, setError } = usePostReq("/auth/admin-login");
  const { authStateChange, currentUser } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passRef.current?.value;

    try {
      const res = await execute({ email, password });
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      await authStateChange();
    } catch (err) {
      setError("Something went wrong!");
      return setTimeout(() => setError(""), 4000);
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
