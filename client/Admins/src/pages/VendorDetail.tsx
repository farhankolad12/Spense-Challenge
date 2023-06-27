import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";

export default function VendorDetail() {
  const { id } = useParams();

  const {
    error,
    loading,
    userData: vendor,
  } = useGetReq("/super-admins/vendor-id", { id });

  return !loading ? (
    vendor ? (
      <>
        <ErrorCon error={error} />
        <div className="container">
          <div className="bg-white p-3">
            <div className="d-flex flex-column gap-3 border-bottom pb-3">
              <img
                src={
                  vendor.logo
                    ? import.meta.env.VITE_APP_API_URL +
                      "/public/uploads/" +
                      vendor.logo
                    : import.meta.env.VITE_APP_API_URL +
                      "/public/defaultProfile.png"
                }
                width="80px"
                alt="Logo"
              />
              <h3 className="text-primary">
                {vendor.firstName + " " + vendor.lastName}
              </h3>
            </div>
            <div className="d-md-flex justify-content-around my-4 gap-5 align-items-center">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column gap-1">
                  <div className="text-primary d-flex gap-1">
                    <i className="bi bi-envelope" />
                    <span>Email</span>
                  </div>
                  <span>{vendor.email}</span>
                </div>
                <div className="d-flex flex-column gap-1">
                  <div className="text-primary d-flex gap-1">
                    <i className="bi bi-phone" />
                    <span>Mobile</span>
                  </div>
                  <span>{vendor.mobile}</span>
                </div>

                <div className="d-flex flex-column gap-1">
                  <div className="d-flex flex-column gap-1">
                    <div className="text-primary d-flex gap-1">
                      <i className="bi bi-house" />
                      <span>Address</span>
                    </div>
                    <span>{vendor.address}</span>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex flex-column gap-1">
                    <div className="text-primary d-flex gap-1">
                      <i className="bi bi-shop" />
                      <span>Store Name</span>
                    </div>
                    <span>{vendor.storeName}</span>
                  </div>
                </div>
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex flex-column gap-1">
                    <div className="text-primary d-flex gap-1">
                      <i className="bi bi-tv" />
                      <span>Website</span>
                    </div>
                    <Link
                      to={
                        import.meta.env.VITE_APP_API_URL +
                        "/vendor-detail/" +
                        vendor.id
                      }
                    >
                      Go to store
                    </Link>
                  </div>
                </div>
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex flex-column gap-1">
                    <div className="text-primary d-flex gap-1">
                      <i className="bi bi-book" />
                      <span>Joined</span>
                    </div>
                    <span>{vendor.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2rem",
            }}
            className="d-md-grid container my-4 text-light"
          >
            <div className="d-flex p-3 justify-content-between align-items-center bg-warning text-dark">
              <div className="d-flex flex-column gap-1">
                <span>{vendor.totalOrders}</span>
                <strong>Total Orders</strong>
              </div>
              <i className="bi bi-speedometer2 fs-1" />
            </div>
            <div className="d-flex p-3 justify-content-between align-items-center bg-danger">
              <div className="d-flex flex-column gap-1">
                <span>{vendor.totalCancelOrders}</span>
                <strong>Total Cancelled Orders</strong>
              </div>
              <i className="bi bi-x-circle fs-1" />
            </div>
            <div className="d-flex p-3 justify-content-between align-items-center bg-secondary">
              <div className="d-flex flex-column gap-1">
                <span>{vendor.totalProducts}</span>
                <strong>Total Products</strong>
              </div>
              <i className="bi bi-box-seam fs-1" />
            </div>
            <div className="d-flex p-3 justify-content-between align-items-center bg-success">
              <div className="d-flex flex-column gap-1">
                <span>0</span>
                <strong>Total earnings</strong>
              </div>
              <i className="bi bi-file-bar-graph fs-1" />
            </div>
          </div>
        </div>
      </>
    ) : (
      <Navigate to="/" />
    )
  ) : (
    "loading..."
  );
}
