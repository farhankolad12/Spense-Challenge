import { useRef } from "react";
import "../../css/navbar.css";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import CategoryCollapse from "./CategoryCollapse";
import AttributesCollpase from "./AttributesCollpase";
import HomePageSettings from "./HomePageSettings";
import CMSPagesCollapse from "./CMSPagesCollapse";
import { useAuth } from "../../context/AuthProvider";
import usePostReq from "../../hooks/usePostReq";
import ErrorCon from "../Message/ErrorCon";
import BtnLoading from "../Message/BtnLoading";

export default function SideBar() {
  const headerToggle = useRef<HTMLButtonElement>(null);
  const navBarToggle = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);

  const navigate = useNavigate();
  const { currentUser, authStateChange } = useAuth();
  const { error, execute, loading, setError } =
    usePostReq("/auth/admin-logout");

  async function handleLogout() {
    try {
      await execute({});
      await authStateChange();
      navigate("/login");
    } catch (err) {
      setError("Something went wrong!");
      return setTimeout(() => setError(""), 4000);
    }
  }

  function showNavbar() {
    const toggle = headerToggle.current,
      nav = navBarToggle.current,
      headerpd = header.current;

    // Validate that all variables exist
    if (toggle && nav && headerpd) {
      toggle.addEventListener("click", () => {
        // show navbar
        nav.classList.toggle("show");
        // change icon
        toggle.classList.toggle("bx-x");
        // add padding to header
        headerpd.classList.toggle("body-pd");
      });
    }
  }

  function handleClick() {
    showNavbar();
  }

  return (
    <>
      <ErrorCon error={error} />
      <header className="header" ref={header} id="header">
        <div className="header_toggle">
          <button
            id="header-toggle"
            ref={headerToggle}
            onClick={handleClick}
            className="btn p-0"
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
        <div className="dropdown">
          <span
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {currentUser?.type}
          </span>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item btn d-flex align-items-center gap-2">
                <i className="bi bi-key fs-5"></i>
                <span>Change Password</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="dropdown-item btn d-flex align-items-center gap-2"
              >
                <i className="bi bi-power fs-5"></i>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </header>

      <div className="l-navbar" ref={navBarToggle} id="nav-bar">
        <nav className="nav">
          <div>
            <Link to="/" className="nav_logo">
              <i className="bi bi-person-fill nav_logo-icon"></i>
              <span className="nav_logo-name">E-Commerce</span>
            </Link>
            <div className="nav_list">
              <CustomLink to="/" name="Dashboard" icon="bi-grid" />
              {currentUser && currentUser.type === "admin" && (
                <>
                  <CategoryCollapse />
                  <AttributesCollpase />
                  <HomePageSettings />
                  <CustomLink to="/vendors" name="Vendors" icon="bi-people " />
                  <CustomLink
                    to="/customers"
                    name="Customers"
                    icon="bi-people "
                  />
                  <CustomLink
                    to="/coupons"
                    name="Coupons"
                    icon="bi-gift-fill "
                  />
                  <CustomLink
                    to="/subscribers"
                    name="Subscribers"
                    icon="bi-check-lg"
                  />
                  <CMSPagesCollapse />
                </>
              )}
              {currentUser && currentUser.type === "vendor" && (
                <>
                  <CustomLink to="/products" name="Products" icon="bi-list " />
                  <CustomLink to="/orders" name="Orders" icon="bi-cart-fill" />
                  <CustomLink
                    to="/settings"
                    name="Settings"
                    icon="bi-gear-fill"
                  />
                </>
              )}
              <button
                disabled={loading}
                onClick={handleLogout}
                className="btn nav_link"
              >
                {loading ? (
                  <BtnLoading color="light" />
                ) : (
                  <>
                    <i className="bi bi-box-arrow-left nav_icon"></i>
                    <span className="nav_name">SignOut</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export const CustomLink = ({
  to,
  icon,
  name,
}: {
  to: string;
  icon: string;
  name: string;
}) => {
  const resolvedPath = useResolvedPath({ pathname: to });
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link to={to} className={`nav_link ${isActive ? "active" : ""}`}>
      <i className={`bi nav_icon ${icon}`}></i>
      <span className="nav_name">{name}</span>
    </Link>
  );
};
