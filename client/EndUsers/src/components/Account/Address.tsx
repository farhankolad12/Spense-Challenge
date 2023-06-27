import { useState } from "react";
import useGetReq from "../../hooks/useGetReq";
import AccountNav from "./AccountNav";
import AddAddress from "./AddAddress";
import ErrorCon from "../Auth/ErrorCon";
import usePostReq from "../../hooks/usePostReq";
import SuccessCon from "../Auth/SuccessCon";
import BtnLoading from "../Loading/BtnLoading";
import EditAddress from "./EditAddress";

export type SingleAddress = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  landMark: string;
  pincode: string;
  address: string;
  id: string;
};

type Address = {
  uid: string;
  address: SingleAddress[];
};

export default function Address() {
  const [makeReq, setMakeReq] = useState(0);
  const [success, setSuccess] = useState("");
  const [selectedToEdit, setSelectedToEdit] = useState<SingleAddress>();

  const {
    error,
    loading,
    userData: address,
  } = useGetReq("/account/get-address", { makeReq });

  const {
    error: deleteErr,
    execute: deleteAddress,
    loading: deleteLoading,
    setError: setDeleteErr,
  } = usePostReq("/account/delete-address");

  async function handleDelete(id: string) {
    try {
      const res = await deleteAddress({ id });
      if (res.success) {
        setSuccess("Address deleted!");
        setMakeReq(Math.floor(Math.random() * 999999));
        return setTimeout(() => setSuccess(""), 4000);
      } else {
        setDeleteErr(res.message);
        return setTimeout(() => setDeleteErr(""), 4000);
      }
    } catch (err) {
      setDeleteErr("Something went wrong");
      return setTimeout(() => setDeleteErr(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={deleteErr} />
      <SuccessCon success={success} />
      {loading ? (
        "loading"
      ) : (
        <div className="container py-5">
          <div className="d-md-flex justify-content-center align-items-start gap-5">
            <AccountNav />
            <div
              style={{
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
              className="w-100 d-md-grid container mt-md-0 mt-5"
            >
              {address?.address.map((addr: SingleAddress) => {
                return (
                  <div
                    key={addr.id}
                    className="bg-white d-flex flex-column gap-3"
                  >
                    <div
                      style={{ backgroundColor: "#ecedef" }}
                      className="border-bottom mt-md-0 mt-3"
                    >
                      <div className="d-flex justify-content-between align-items-center p-3">
                        <span>{`${addr.firstName} ${addr.lastName}`}</span>
                        <div className="d-flex gap-3">
                          <button
                            onClick={() => setSelectedToEdit(addr)}
                            data-bs-toggle="modal"
                            data-bs-target="#edit-address"
                            className="btn btn-success p-0 px-1"
                          >
                            Edit
                          </button>
                          <button
                            disabled={deleteLoading}
                            onClick={() => handleDelete(addr.id)}
                            className="btn btn-danger p-0 px-1"
                          >
                            {deleteLoading ? (
                              <BtnLoading color="light" />
                            ) : (
                              "Delete"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column gap-2 p-3">
                      <span>
                        {addr.address +
                          " " +
                          addr.landMark +
                          " - " +
                          addr.pincode}
                      </span>
                      <span>{addr.mobile}</span>
                      <span>{addr.email}</span>
                    </div>
                  </div>
                );
              })}
              <div className="bg-white d-flex flex-column justify-content-center align-items-center gap-3 text-center mt-md-0 mt-3 py-3">
                <button
                  style={{
                    boxShadow: "none",
                    width: "100px",
                    aspectRatio: "1/1",
                    borderRadius: "50%",
                  }}
                  className="btn p-0 border"
                  data-bs-toggle="modal"
                  data-bs-target="#add-address"
                >
                  <i className="bi bi-house fs-1"></i>
                </button>
                <span>Add address</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <AddAddress setMakeReq={setMakeReq} />
      {selectedToEdit && (
        <EditAddress
          selectedToEdit={selectedToEdit}
          setMakeReq={setMakeReq}
          setSelectedToEdit={setSelectedToEdit}
        />
      )}
    </>
  );
}
