import "../css/checkout.css";
import { formatCurrency } from "../utils/formatCurrency";
import { useApp } from "../context/AppContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ErrorCon from "../components/Auth/ErrorCon";
import useGetReq from "../hooks/useGetReq";
import { FormEvent, useState } from "react";
import usePostReq from "../hooks/usePostReq";
import { nanoid } from "nanoid";
import BtnLoading from "../components/Loading/BtnLoading";
import successLogo from "../assets/success.png";

export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  pincode: string;
  email: string;
  address: string;
  landMark: string;
};

export default function Checkout() {
  const [success, setSuccess] = useState(false);
  const [selectedAddrId, setSelectedAddrId] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const navigate = useNavigate();
  const { setMakeReq } = useApp();

  const {
    error,
    loading,
    userData: address,
  } = useGetReq("/account/get-address", {});

  const {
    error: orderErr,
    execute: placeOrder,
    loading: orderLoading,
    setError,
  } = usePostReq("/orders/place-order");

  const {
    totalDiscount,
    totalShipping,
    totalTax,
    subTotal,
    grandTotal,
    cartItems,
  } = useApp();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (selectedAddrId === "") {
      setError("Address not selected");
      return setTimeout(() => setError(""), 4000);
    }

    try {
      const res = await placeOrder({
        id: nanoid(20),
        addressId: selectedAddrId,
        orderNote,
        paymentMode: selectedPayment,
      });
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      setSuccess(true);
      setMakeReq(Math.floor(Math.random() * 99999));
    } catch {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 400);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={orderErr} />
      {success ? (
        <div className="d-flex flex-column gap-3 align-items-center justify-content-center py-5 text-center bg-white">
          <img src={successLogo} width="20%" alt="success" />
          <h3>Order placed</h3>
          <Link to="/orders">Go to orders</Link>
        </div>
      ) : cartItems && cartItems.length > 0 ? (
        <div className="bg-white">
          <div className="py-2">
            <div className="container">
              <div className="d-flex align-items-center gap-3">
                <Link to="/">
                  <i className="bi bi-house fs-5" />
                </Link>
                <span>/</span>
                <span>Checkout</span>
              </div>
            </div>
          </div>
          <div className="container check-out-page py-5 ">
            <div className="w-100">
              <h3 className="my-3">Billing Details</h3>
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <div>
                  {!loading
                    ? address && address.address.length
                      ? address.address.map((addr: Address) => {
                          return (
                            <div
                              key={addr.id}
                              className="form-check border m-0 p-5"
                            >
                              <input
                                onChange={(e) =>
                                  setSelectedAddrId(e.target.value)
                                }
                                className="form-check-input"
                                type="radio"
                                name="address"
                                value={addr.id}
                                required
                              />
                              <label
                                className="w-100 form-check-label"
                                htmlFor={addr.id}
                              >
                                <div className="d-flex flex-column gap-1">
                                  <span>
                                    {addr.firstName + " " + addr.lastName} (
                                    {addr.email})
                                  </span>
                                  <span>{addr.mobile}</span>
                                  <span>
                                    {addr.address +
                                      " | " +
                                      addr.landMark +
                                      " | " +
                                      addr.pincode}
                                  </span>
                                </div>
                              </label>
                            </div>
                          );
                        })
                      : ""
                    : "loading..."}
                  <div className="border-start border-end border-bottom p-4">
                    <button
                      onClick={() => navigate("/address")}
                      style={{ boxShadow: "none" }}
                      className="btn w-100 p-0 fw-bold d-flex gap-2"
                    >
                      <i className="bi bi-plus-lg" />
                      <span>Add Address</span>
                    </button>
                  </div>
                </div>

                <textarea
                  rows={4}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  id="order-notes"
                  placeholder="Order Notes (optional)"
                  className="form-control"
                />
                <div>
                  <h3>Payment</h3>
                  <div className="border">
                    <div className="form-check d-flex gap-2 border-bottom py-3 ps-5">
                      <input
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id="cod"
                        required
                        value="cod"
                      />
                      <label className="w-100 form-check-label" htmlFor="cod">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-cash-stack fs-5" />
                          <span>COD</span>
                        </div>
                      </label>
                    </div>
                    <div className="form-check d-flex gap-2 border-bottom py-3 ps-5">
                      <input
                        required
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        value="stripe"
                        id="stripe"
                      />
                      <label
                        className="w-100 form-check-label"
                        htmlFor="stripe"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-stripe fs-5" />
                          <span>Stripe</span>
                        </div>
                      </label>
                    </div>
                    <div className="d-flex gap-2 form-check py-3 ps-5">
                      <input
                        required
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        value="razorpay"
                        id="razorpay"
                      />
                      <label
                        className="w-100 form-check-label"
                        htmlFor="razorpay"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-credit-card fs-5" />
                          <span>Razorpay</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  disabled={orderLoading}
                  type="submit"
                  className="btn btn-dark w-100 py-3"
                >
                  {orderLoading ? (
                    <BtnLoading color="light" />
                  ) : (
                    "Proceed to payment"
                  )}
                </button>
              </form>
            </div>
            <div className="order-summary">
              <div className="card card-body bg-light">
                <div className="border-bottom py-3">
                  <h4>Order Summary</h4>
                </div>
                <div className="border-bottom p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subTotal, "INR")}</span>
                  </div>
                </div>
                <div className="border-bottom p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Tax</span>
                    <span>{formatCurrency(totalTax, "INR")}</span>
                  </div>
                </div>
                <div className="border-bottom p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Shipping</span>
                    <span>{formatCurrency(totalShipping, "INR")}</span>
                  </div>
                </div>
                <div className="border-bottom p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Discount</span>
                    <span>{formatCurrency(totalDiscount, "INR")}</span>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between align-items-center  p-3">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold">
                      {formatCurrency(grandTotal, "INR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
