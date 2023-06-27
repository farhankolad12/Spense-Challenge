import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorCon from "../components/Auth/ErrorCon";
import BtnLoading from "../components/Loading/BtnLoading";
import usePostReq from "../hooks/usePostReq";
import { nanoid } from "nanoid";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { error, execute, loading, setError } = usePostReq("/auth/signup");

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password don't match");
      return setTimeout(() => setError(""), 4000);
    }

    try {
      const data = {
        id: nanoid(),
        name,
        email,
        mobile,
        password,
      };
      const res = await execute(data);
      if (res.success) {
        localStorage.setItem("userEmail", email);
        return navigate("/otp-verify");
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
      <div
        className="container px-3"
        style={{ maxWidth: "600px", padding: "7rem 0 4rem 0" }}
      >
        <div className="d-flex flex-column justify-content-center card card-body py-5">
          <h3 className="text-center text-warning fw-bold">Signup</h3>
          <form onSubmit={handleSubmit} className="row g-3 my-2">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                id="mobile"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="password"
                className="form-control"
                id="password1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="password"
                className="form-control"
                id="password2"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="col-12 d-flex justify-content-between">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  required
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
                <Link className="fw-bold" to="/login">
                  Signin
                </Link>
              </span>
            </div>
            <div className="col-12">
              <button type="submit" className="py-3 btn btn-primary w-100">
                {loading ? <BtnLoading color="dark" /> : "Signup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
