import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CartRow from "./CartRow";
import { formatCurrency } from "../../utils/formatCurrency";
import { useApp } from "../../context/AppContext";
import { Cart } from "../Cart/CartRowItem";

export default function CartOffCanvas() {
  const navigate = useNavigate();
  const { cartItems } = useApp();

  const { currentUser } = useAuth();

  const { subTotal } = useApp();

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        data-bs-scroll="true"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Cart
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {currentUser ? (
            <>
              {cartItems && cartItems.length > 0 ? (
                <>
                  <div className="d-flex flex-column gap-3">
                    {cartItems.map((cart: Cart) => {
                      return <CartRow cart={cart} key={cart.productId} />;
                    })}
                  </div>
                  <div className="d-flex justify-content-between py-3 border-top border-bottom my-4">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subTotal, "INR")}</span>
                  </div>
                  <button
                    onClick={() => navigate("/cart")}
                    className="btn btn-primary w-100"
                  >
                    View Cart
                  </button>
                </>
              ) : (
                <h3>Nothing in cart</h3>
              )}
            </>
          ) : (
            <div className="d-flex flex-column gap-3 text-center">
              <img
                src="https://gravityinfotech.net/project/e-com/storage/app/public/images/no-data.png"
                alt="Login"
                width="100%"
              />
              <h3>Please Login</h3>
              <span>Login requires to access cart</span>
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => navigate("/login")}
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
