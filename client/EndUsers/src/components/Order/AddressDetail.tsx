import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";
import { Order } from "./OrderRow";

export default function AddressDetail({ order }: { order: Order }) {
  const {
    error,
    loading,
    userData: address,
  } = useGetReq("/account/get-address-id", { id: order.addressId });

  return (
    <>
      <ErrorCon error={error} />
      {!loading
        ? address && (
            <div className="bg-white border rounded">
              <div className="border-bottom">
                <h3 className="p-3">Billing details</h3>
              </div>
              <div className="p-3 d-md-flex justify-content-between">
                <div className="d-flex flex-column gap-1">
                  <span>{address.firstName + " " + address.lastName},</span>
                  <span>{address.email},</span>
                  <span>{address.mobile}</span>
                </div>
                <div className="d-flex flex-column gap-2">
                  <strong className="mb-2">Shipping address</strong>
                  <span>{address.address},</span>
                  <span>{address.landMark},</span>
                  <span>{address.pincode}</span>
                </div>
              </div>
            </div>
          )
        : "loading"}
    </>
  );
}
