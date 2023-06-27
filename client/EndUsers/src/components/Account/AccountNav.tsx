import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import usePostReq from "../../hooks/usePostReq";
import { useAuth } from "../../context/AuthContext";
import ErrorCon from "../Auth/ErrorCon";
import { useApp } from "../../context/AppContext";

export default function AccountNav() {
  const { error, execute, loading, setError } = usePostReq("/auth/logout");

  const {
    setMakeReq,
    setTotalDiscount,
    setSubTotal,
    setTotalShipping,
    setTotalTax,
  } = useApp();
  const { authStateChange } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await execute({});
      await authStateChange();
      await setMakeReq(Math.floor(Math.random() * 9999));
      setSubTotal(0);
      setTotalDiscount(0);
      setTotalShipping(0);
      setTotalTax(0);
      setMakeReq(Math.floor(Math.random() * 99999));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <ul className="list-group bg-white w-50  ">
        <CustomLink name="Orders" to="/orders" />
        <CustomLink name="Wishlist" to="/wishlist" />
        <CustomLink name="All notifications" to="/notifications" />
        <CustomLink name="Account settings" to="/account" />
        <CustomLink name="My address" to="/address" />
        <CustomLink name="Wallet" to="/wallet" />
        <li className="list-group-item">
          <button
            disabled={loading}
            className="btn p-0 d-flex justify-content-between align-items-center w-100"
            style={{ boxShadow: "none" }}
            onClick={handleLogout}
          >
            <span>{loading ? "loading..." : "Logout"}</span>
            <span>
              <i className="bi bi-chevron-right"></i>
            </span>
          </button>
        </li>
      </ul>
    </>
  );
}

const CustomLink = ({ name, to }: { name: string; to: string }) => {
  const resolvedPath = useResolvedPath({ pathname: to });
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className="list-group-item">
      <Link
        className={`d-flex justify-content-between align-items-center ${
          !isActive ? "text-dark" : ""
        }`}
        to={to}
      >
        <span>{name}</span>
        <span>
          <i className="bi bi-chevron-right"></i>
        </span>
      </Link>
    </li>
  );
};
