import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { Categories, useApp } from "../../context/AppContext";
import Logo from "../../assets/Logo";
import "../../css/header.css";
import { useState, useEffect, useRef } from "react";
import CategoriesOffCanvas from "./CategoriesOffCanvas";
import NavCategoriesOffCanvas from "./NavCategoriesOffCanvas";
import CartOffCanvas from "./CartOffCanvas";
import { useAuth } from "../../context/AuthContext";
import usePostReq from "../../hooks/usePostReq";
import ErrorCon from "../Auth/ErrorCon";
import CategoryRow from "../Categories/CategoryRow";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { userData } = useApp();
  const { currentUser, authStateChange } = useAuth();
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const { error, loading, execute, setError } = usePostReq("/auth/logout");

  const {
    cartItems,
    setMakeReq,
    setSubTotal,
    setTotalDiscount,
    setTotalShipping,
    setTotalTax,
  } = useApp();

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navRef.current?.classList.add("fixed-top");
        // add padding top to show content behind navbar
        const navbar_height = navRef.current?.offsetHeight;
        document.body.style.paddingTop = navbar_height + "px";
      } else {
        navRef.current?.classList.remove("fixed-top");
        // remove padding top from body
        document.body.style.paddingTop = "0";
      }
    });
  }, [navRef]);

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
      <header>
        <div className="bg-white header-one">
          <div className=" d-flex align-items-center justify-content-between w-100 py-2 w-100 container">
            <div></div>
            <div className="d-flex align-items-center gap-4">
              {currentUser ? (
                <>
                  <Link
                    className="text-decoration-none text-dark d-flex align-items-center gap-2"
                    to="/account"
                  >
                    <i className="bi bi-bag" />
                    <span>My Account</span>
                  </Link>
                  <Link
                    className="text-decoration-none text-dark"
                    to="/wishlist"
                  >
                    <span>Wishlist</span>
                  </Link>
                  <button
                    disabled={loading}
                    onClick={handleLogout}
                    className="btn d-flex align-items-center gap-1 border-none"
                  >
                    {loading ? (
                      "loading.."
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-right fs-5"></i>
                        <span>Logout</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="text-decoration-none text-dark d-flex align-items-center gap-2"
                    to="/login"
                  >
                    <i className="bi bi-person" />
                    <span>Login</span>
                  </Link>
                  <Link
                    className="text-decoration-none text-dark"
                    to="/vendor-signup"
                  >
                    <span>Become a vendor ?</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-5 bg-primary py-4 header-two">
          <Logo />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn search-btn rounded-circle border"
          >
            <i className="bi bi-search fs-4 text-light" />
          </button>
          <form>
            <input
              className="form-control w-100 py-3"
              type="search"
              placeholder="Search entire store here"
            />
          </form>
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              className="btn fs-4 rounded-circle border cart-btn"
            >
              <i className="bi bi-cart text-light" />
              <span className="d-flex align-items-center justify-content-center bg-light fs-6 indicator">
                {cartItems && cartItems.length ? cartItems.length : 0}
              </span>
            </button>

            <span className="text-warning fw-bold">My Cart</span>
          </div>
        </div>
        <nav
          id="navbar_top"
          ref={navRef}
          className="navbar navbar-expand-lg navbar-dark bg-dark "
        >
          <div className="d-flex justify-content-between align-items-center container py-1  header-three">
            <button
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#categories"
              aria-controls="categories"
              className="d-flex align-items-center gap-2 btn p-0 shop-categories-mobile"
            >
              <i className="bi bi-list fs-4 text-warning" />
              <span className="text-light">Shop by categories</span>
            </button>
            <div className="dropdown">
              <button
                type="button"
                className="d-flex align-items-center gap-2 btn p-0 dropdown-toggle shop-categories"
                id="dropdownMenuButton"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-list fs-4 text-warning" />
                <span className="text-light">Shop by categories</span>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {userData.category.map((category: Categories) => {
                  return <CategoryRow category={category} key={category.id} />;
                })}
              </ul>
            </div>
            <button
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
              className="btn nav-btn"
            >
              <i className="bi bi-list fs-3 text-light" />
            </button>
            <div className="d-flex gap-3 nav-categories">
              <CustomLink to="/" name="Home" />
              <CustomLink to="/categories" name="Categories" />
              <CustomLink to="/new-products" name="New Products" />
              <CustomLink to="/feature-products" name="Feature Products" />
              <CustomLink to="/hot-products" name="Hot Products" />
            </div>
          </div>
        </nav>
        {isOpen && (
          <form className="search-input">
            <input
              className="form-control w-100 py-3"
              type="search"
              placeholder="Search entire store here"
            />
          </form>
        )}
      </header>
      <CategoriesOffCanvas />
      <NavCategoriesOffCanvas />
      <CartOffCanvas />
    </>
  );
}

type CustomLink = { to: string; name: string };

const CustomLink = ({ to, name }: CustomLink) => {
  const resolvedPath = useResolvedPath({ pathname: to });
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link
      to={to}
      className={`${
        isActive ? "text-warning" : "text-light"
      } text-decoration-none`}
    >
      {name}
    </Link>
  );
};
