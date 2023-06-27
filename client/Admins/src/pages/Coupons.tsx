import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetReq from "../hooks/useGetReq";
import CouponRow from "../components/Coupon/CouponRow";
import ErrorCon from "../components/Message/ErrorCon";

export type Coupon = {
  id: string;
  name: string;
  type: string;
  amount: string;
  usagePerUser: string;
  perUser: string;
  startDate: number;
  endDate: number;
  minimumAmount: string;
};

export default function Coupons() {
  const [makeReq, setMakeReq] = useState(0);
  const navigate = useNavigate();

  const {
    error,
    loading,
    userData: coupons,
  } = useGetReq("/coupons/get-coupons", { makeReq });

  return (
    <>
      <ErrorCon error={error} />
      <div className="container">
        <div className="p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <span className="fs-4 text-uppercase">Coupons</span>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/coupons/add")}
            >
              Add Coupon
            </button>
          </div>
          <form className="d-flex">
            <input
              type="text"
              className="form-control rounded-start-pill"
              placeholder="Type & Enter"
            />
            <button type="submit" className="btn btn-light rounded-start-0">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <div className="table-responsive">
            <table className="table table-striped border my-4">
              <thead>
                <tr>
                  <th scope="col" className="border-end">
                    #
                  </th>
                  <th scope="col" className="border-end">
                    Coupon name
                  </th>
                  <th scope="col" className="border-end">
                    Amount
                  </th>
                  <th scope="col" className="border-end">
                    Per user usage
                  </th>
                  <th scope="col" className="border-end">
                    Start date - End date
                  </th>
                  <th scope="col" className="border-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading && coupons ? (
                  coupons.map((coupon: Coupon) => {
                    return (
                      <CouponRow
                        setMakeReq={setMakeReq}
                        key={coupon.id}
                        coupon={coupon}
                      />
                    );
                  })
                ) : (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
