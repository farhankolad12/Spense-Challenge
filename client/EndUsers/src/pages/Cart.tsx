import "../css/cartInfo.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../utils/formatCurrency";
import CartRowItem, { Cart as CartType } from "../components/Cart/CartRowItem";
import usePostReq from "../hooks/usePostReq";
import ErrorCon from "../components/Auth/ErrorCon";
import BtnLoading from "../components/Loading/BtnLoading";

export default function Cart() {
  const [coupon, setCoupon] = useState("");

  const {
    cartItems,
    totalDiscount,
    totalTax,
    totalShipping,
    subTotal,
    grandTotal,
    setTotalShipping,
    setTotalTax,
    setSubTotal,
    setTotalDiscount,
    setMakeReq,
  } = useApp();

  const { error, execute, loading, setError } = usePostReq(
    "/coupons/check-coupon"
  );

  const navigate = useNavigate();

  async function handleDiscount() {
    if (coupon === "") {
      setError("Please enter coupon code");
      return setTimeout(() => setError(""), 4000);
    }

    try {
      const res = await execute({ coupon });
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      await setTotalShipping(0);
      await setTotalTax(0);
      await setSubTotal(0);
      await setTotalDiscount(0);
      await setMakeReq(Math.floor(Math.random() * 99999));
    } catch {
      setError("Something went wrong!");
      return setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <div className="bg-white">
        <div className="py-2">
          <div className="container">
            <div className="d-flex gap-2 align-items-center">
              <Link to="/">
                <i className="bi bi-house fs-5" />
              </Link>
              <span>/</span>
              <span>Cart</span>
            </div>
          </div>
        </div>
        <div className="container">
          {cartItems && cartItems.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <td scope="col">Product</td>
                      <td scope="col">Qty</td>
                      <td scope="col">Item Total</td>
                      <td scope="col">Tax</td>
                      <td scope="col">Shipping</td>
                      <td scope="col">Total</td>
                      <td scope="col">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item: CartType) => {
                      return <CartRowItem item={item} key={item.id} />;
                    })}
                  </tbody>
                </table>
              </div>
              <div className="cart-info my-4">
                <div className="w-100 d-flex align-items-start gap-4">
                  <div className="d-flex gap-1 flex-column">
                    <label htmlFor="coupon">Coupon code</label>
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      id="coupon"
                      type="text"
                      placeholder="Coupon code"
                      className="form-control"
                    />
                  </div>
                  <button
                    disabled={loading}
                    onClick={handleDiscount}
                    className="btn btn-dark mt-4"
                  >
                    {loading ? <BtnLoading color="light" /> : "Apply"}
                  </button>
                </div>
                <div className="d-flex flex-column w-100 gap-3">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item ">
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subTotal, "INR")}</span>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Tax</span>
                        <span>{formatCurrency(totalTax, "INR")}</span>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Shipping</span>
                        <span>{formatCurrency(totalShipping, "INR")}</span>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3">
                          <span>Discount</span>
                          {cartItems &&
                            cartItems.length > 0 &&
                            cartItems[0].couponCode && (
                              <span className="badge text-bg-warning">
                                #{cartItems[0].couponCode.cname}
                              </span>
                            )}
                        </div>
                        <span> - {formatCurrency(totalDiscount, "INR")}</span>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <strong>Grand total</strong>
                        <strong>{formatCurrency(grandTotal, "INR")}</strong>
                      </div>
                    </li>
                  </ul>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="btn btn-dark mb-4"
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h3 className="text-center my-4">No item in cart!</h3>
          )}
        </div>
      </div>
    </>
  );
}
