import { Navigate, useParams } from "react-router-dom";
import useGetReq from "../hooks/useGetReq";
import CouponsAdd from "./CouponsAdd";
import ErrorCon from "../components/Message/ErrorCon";

export default function CouponsEdit() {
  const { id } = useParams();

  const {
    error,
    loading,
    userData: coupon,
  } = useGetReq("/coupons/get-coupon-id", { id });

  return !loading ? (
    coupon ? (
      <>
        <ErrorCon error={error} />
        <CouponsAdd coupon={coupon} />
      </>
    ) : (
      <Navigate to="/" />
    )
  ) : (
    "loading"
  );
}
