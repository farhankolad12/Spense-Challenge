import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";
import usePostReq from "../../hooks/usePostReq";
import ErrorCon from "../Message/ErrorCon";
import SuccessCon from "../Message/SuccessCon";
import BtnLoading from "../Message/BtnLoading";
import { Coupon } from "../../pages/Coupons";

export default function CouponRow({
  coupon,
  setMakeReq,
}: {
  coupon: Coupon;
  setMakeReq: Function;
}) {
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const { error, execute, loading, setError } = usePostReq(
    "/coupons/delete-coupon"
  );

  async function handleDelete() {
    try {
      const res = await execute({ id: coupon.id });

      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      await setMakeReq(Math.floor(Math.random() * 999999));
      setSuccess("Coupon deleted");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <SuccessCon success={success} />
      <ErrorCon error={error} />
      <tr>
        <td className="border-end">
          <span>{coupon.id}</span>
        </td>
        <td className="border-end">
          <span>{coupon.name}</span>
        </td>
        <td className="border-end">
          <span>
            {coupon.type === "percent"
              ? `${coupon.amount}%`
              : formatCurrency(+coupon.amount)}
          </span>
        </td>
        <td className="border-end">
          <span>
            {coupon.usagePerUser === "limited"
              ? coupon.perUser
              : coupon.usagePerUser}
          </span>
        </td>
        <td className="border-end">
          <div className="d-flex gap-3 justify-content-center">
            <span className="badge text-bg-info px-3 py-2">
              {new Date(coupon.startDate).toLocaleDateString("en-US")}
            </span>
            <span className="badge text-bg-warning px-3 py-2">
              {new Date(coupon.endDate).toLocaleDateString("en-US")}
            </span>
          </div>
        </td>
        <td className="border-end">
          <button
            className="btn"
            onClick={() => navigate(`/coupons/edit/${coupon.id}`)}
          >
            <i className="bi bi-pen fs-5 text-warning" />
          </button>
          <button onClick={handleDelete} className="btn">
            {loading ? (
              <BtnLoading color="light" />
            ) : (
              <i className="bi bi-trash fs-5 text-danger" />
            )}
          </button>
        </td>
      </tr>
    </>
  );
}
