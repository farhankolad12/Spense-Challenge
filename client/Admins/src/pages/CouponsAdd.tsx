import { useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import usePostReq from "../hooks/usePostReq";
import ErrorCon from "../components/Message/ErrorCon";
import BtnLoading from "../components/Message/BtnLoading";
import { nanoid } from "nanoid";
import SuccessCon from "../components/Message/SuccessCon";
import { Coupon } from "./Coupons";

export default function CouponsAdd({ coupon }: { coupon: Coupon | undefined }) {
  const [name, setName] = useState(coupon ? coupon.name : "");
  const [type, setType] = useState(coupon ? coupon.type : "0");
  const [amount, setAmount] = useState(coupon ? coupon.amount : "");
  const [usagePerUser, setUsagePerUser] = useState(
    coupon ? coupon.usagePerUser : "0"
  );
  const [perUser, setPerUser] = useState(coupon ? coupon.perUser : "");
  const [startDate, setStartDate] = useState<number | undefined>(
    coupon && coupon.startDate
  );
  const [endDate, setEndDate] = useState<number | undefined>(
    coupon && coupon.endDate
  );
  const [minimumAmount, setMinimumAmount] = useState(
    coupon ? coupon.minimumAmount : ""
  );
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const { error, execute, loading, setError } = usePostReq(
    "/coupons/add-coupon"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (startDate && endDate) {
      if (startDate > endDate) {
        setError("Invalid date!");
        return setTimeout(() => setError(""), 4000);
      }
    }

    try {
      const res = await execute({
        id: coupon ? coupon.id : nanoid(),
        name,
        type,
        amount,
        usagePerUser,
        perUser,
        startDate,
        endDate,
        minimumAmount,
      });

      if (!res.success) {
        setError(res.message);
        setTimeout(() => setError(""), 4000);
      }
      if (coupon) return navigate("/coupons");
      formRef.current?.reset();
      setName("");
      setType("0");
      setAmount("");
      setUsagePerUser("0");
      setPerUser("");
      setMinimumAmount("");
      setSuccess("Coupon saved!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <div className="my-4">
        <h3>Add coupon</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="d-flex justify-content-center align-items-center  flex-column"
        >
          <div className="d-flex flex-column gap-4 card card-body">
            <div className="d-flex flex-column gap-1">
              <label htmlFor="coupoun-name">Coupon name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                type="text"
                id="coupoun-name"
                className="form-control"
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="amount">Type</label>
              <select
                required
                onChange={(e) => setType(e.target.value)}
                defaultValue={type}
                id="amount"
                className="form-select"
              >
                <option disabled value="0">
                  Please select
                </option>
                <option value="percent">Discount by percentage</option>
                <option value="amount">Discount by amount</option>
              </select>
            </div>
            {type === "percent" ? (
              <div className="d-flex flex-column gap-1">
                <label htmlFor="amount-coupon">Percentage</label>
                <input
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Percentage"
                  type="text"
                  id="amount-coupon"
                  className="form-control"
                />
              </div>
            ) : type === "amount" ? (
              <div className="d-flex flex-column gap-1">
                <label htmlFor="amount-coupon">Amount</label>
                <input
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  type="text"
                  id="amount-coupon"
                  className="form-control"
                />
              </div>
            ) : (
              ""
            )}
            <div className="d-flex flex-column gap-1">
              <label htmlFor="per-user-usage">Per User Usage</label>
              <select
                required
                defaultValue={usagePerUser}
                onChange={(e) => setUsagePerUser(e.target.value)}
                id="per-user-usage"
                className="form-select"
              >
                <option disabled value="0">
                  Please per user usage
                </option>
                <option value="limited">Limited</option>
                <option value="unlimited">Unlimited</option>
              </select>
            </div>
            {usagePerUser === "limited" && (
              <div className="d-flex flex-column gap-1">
                <label htmlFor="lim-val">Value</label>
                <input
                  required
                  value={perUser}
                  onChange={(e) => setPerUser(e.target.value)}
                  type="text"
                  id="lim-val"
                  className="form-control"
                />
              </div>
            )}
            <div className="d-flex justify-content-between gap-5">
              <div className="w-100 d-flex flex-column gap-1">
                <label htmlFor="start-date">Start date</label>
                <input
                  required
                  onChange={(e) =>
                    setStartDate(new Date(e.target.value).getTime())
                  }
                  value={new Date(startDate).toISOString().substring(0, 10)}
                  type="date"
                  id="start-date"
                  className="form-control w-100"
                />
              </div>
              <div className="w-100 d-flex flex-column gap-1">
                <label htmlFor="end-date">End date</label>
                <input
                  required
                  onChange={(e) =>
                    setEndDate(new Date(e.target.value).getTime())
                  }
                  type="date"
                  value={new Date(endDate).toISOString().substring(0, 10)}
                  id="end-date"
                  className="form-control w-100"
                />
              </div>
            </div>
            <div className="w-100 d-flex flex-column gap-1">
              <label htmlFor="min-amount">Minimum order amount</label>
              <input
                required
                value={minimumAmount}
                onChange={(e) => setMinimumAmount(e.target.value)}
                placeholder="Minimum order amout"
                type="text"
                id="min-amount"
                className="form-control w-100"
              />
            </div>
            <div className="d-flex gap-3 justify-content-center align-items-center my-3">
              <button
                disabled={loading}
                type="button"
                onClick={() => navigate("/coupons")}
                className="btn btn-warning"
              >
                {loading ? (
                  <BtnLoading color="dark" />
                ) : (
                  <>
                    <i className="bi bi-x" /> Cancel
                  </>
                )}
              </button>
              <button
                disabled={loading}
                type="submit"
                className="btn btn-secondary"
              >
                {loading ? (
                  <BtnLoading color="light" />
                ) : (
                  <>
                    <i className="bi bi-check" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
