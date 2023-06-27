import { Categories, useApp } from "../../context/AppContext";
import "../../css/footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const { userData } = useApp();
  return (
    <footer style={{ background: "#252c41" }}>
      <div className="py-3">
        <div className="footer-one container py-5">
          <div className="d-flex gap-2 align-items-center">
            <div className="icon-container">
              <i className="bi bi-cart fs-5" style={{ color: "#2288e0" }} />
            </div>
            <div className="d-flex flex-column gap-1">
              <strong>Home Delievery</strong>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </span>
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <div className="icon-container">
              <i
                className="bi bi-currency-dollar fs-5"
                style={{ color: "#2288e0" }}
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <strong>Money Back Guarantee</strong>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </span>
            </div>
          </div>{" "}
          <div className="d-flex gap-2 align-items-center">
            <div className="icon-container">
              <i className="bi bi-headset fs-5" style={{ color: "#2288e0" }} />
            </div>
            <div className="d-flex flex-column gap-1">
              <strong>24x7 Online Support</strong>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </span>
            </div>
          </div>
        </div>
        <div className="border-top">
          <div className="container py-5 d-md-flex gap-4">
            <div>
              <h3 className="text-light ">Contact Info</h3>
              <div className="d-flex gap-3">
                <i className="fs-5 bi bi-house text-primary" />
                <span style={{ color: "#484458" }} className="fw-bold">
                  #302 Brick Market, Jalsa California United State HQS1130
                </span>
              </div>
              <div className="d-flex gap-3">
                <i className="fs-5 bi bi-headset text-primary" />
                <span style={{ color: "#484458" }} className="fw-bold">
                  (41) 254 758 4572
                </span>
              </div>
              <div className="d-flex gap-3">
                <i className="fs-5 bi bi-envelope text-primary" />
                <span style={{ color: "#484458" }} className="fw-bold">
                  contact@domain.com
                </span>
              </div>
            </div>
            <div className="d-md-flex justify-content-between gap-5 w-100">
              <div className="py-4">
                <div className="mb-3">
                  <strong className="text-light">Categories</strong>
                </div>
                <div className="d-flex flex-column gap-2">
                  {userData.category.slice(0, 4).map((category: Categories) => {
                    return (
                      <Link
                        key={category.id}
                        style={{ color: "#484458" }}
                        className=""
                        to={"/categories/" + category.name}
                      >
                        {category.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="py-4">
                <div className="mb-3">
                  <strong className="text-light">Lastest News</strong>
                </div>
                <div className="d-flex flex-column gap-2">
                  <Link
                    style={{ color: "#484458" }}
                    className="fw-bold"
                    to="/orders"
                  >
                    Orders
                  </Link>
                  <Link
                    style={{ color: "#484458" }}
                    className="fw-bold"
                    to="/wishlist"
                  >
                    Wishlist
                  </Link>
                </div>
              </div>
              <div className="py-4">
                <div className="mb-3">
                  <strong className="text-light ">Customer Support</strong>
                </div>
                <div className="d-flex flex-column gap-2">
                  <Link
                    style={{ color: "#484458" }}
                    className="fw-bold"
                    to="/about-us"
                  >
                    About us
                  </Link>
                  <Link
                    style={{ color: "#484458" }}
                    className="fw-bold"
                    to="/privacy-policy"
                  >
                    Privacy & Policy
                  </Link>
                  <Link
                    style={{ color: "#484458" }}
                    className="fw-bold"
                    to="/terms-conditions"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#1b2132" }} className="py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <span>Copyright</span>
          <div className="d-flex gap-2">
            <Link to="/">
              <i className="bi bi-facebook fs-5" />
            </Link>
            <Link to="/">
              <i className="bi bi-facebook fs-5" />
            </Link>
            <Link to="/">
              <i className="bi bi-facebook fs-5" />
            </Link>
            <Link to="/">
              <i className="bi bi-facebook fs-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
