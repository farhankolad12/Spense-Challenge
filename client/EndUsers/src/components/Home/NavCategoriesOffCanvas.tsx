import { Link } from "react-router-dom";

export default function NavCategoriesOffCanvas() {
  return (
    <div
      className="offcanvas offcanvas-start header-offcanvas bg-dark"
      tabIndex={-1}
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header justify-content-end text-white">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          data-bs-theme="light"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="d-flex flex-column gap-3 ">
          <Link to="/" className="text-warning text-decoration-none">
            Home
          </Link>
          <Link to="/categories" className="text-light text-decoration-none">
            Categories
          </Link>
          <Link to="/new-products" className="text-light text-decoration-none">
            New Products
          </Link>
          <Link
            to="/feature-products"
            className="text-light text-decoration-none"
          >
            Featured Products
          </Link>
          <Link to="/hot-products" className="text-light text-decoration-none">
            Hot Products
          </Link>
        </div>
      </div>
    </div>
  );
}
