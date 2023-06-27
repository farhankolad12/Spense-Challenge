import { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthProvider";
import usePostReq from "../hooks/usePostReq";
import BtnLoading from "../components/Message/BtnLoading";
import ErrorCon from "../components/Message/ErrorCon";
import SuccessCon from "../components/Message/SuccessCon";

export default function VendorSettings() {
  const { currentUser } = useAuth();

  const [storeName, setStoreName] = useState(
    currentUser?.storeName ? currentUser.storeName : ""
  );
  const [email, setEmail] = useState(currentUser?.email);
  const [mobile, setMobile] = useState(currentUser?.mobile);
  const [address, setAddress] = useState(
    currentUser?.address ? currentUser.address : ""
  );
  const [logo, setLogo] = useState<File | undefined | string>(
    currentUser?.logo ? currentUser?.logo : undefined
  );
  const [success, setSuccess] = useState("");

  const { error, execute, loading, setError } = usePostReq(
    "/admin-account/save-profile"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("storeName", storeName);
      formData.append("email", email || "");
      formData.append("mobile", mobile || "");
      formData.append("address", address);
      formData.append("logo", logo || "");

      const res = await execute(formData);

      if (res.success) {
        setSuccess("Profile saved!");
        return setTimeout(() => setSuccess(""), 4000);
      }
      setError(res.message);
      setTimeout(() => setError(""), 4000);
    } catch {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <form onSubmit={handleSubmit} className="bg-white px-4 py-2 my-4">
        <div>
          <div className="d-flex gap-3 py-3 border-bottom">
            <i className="bi bi-person" />
            <span>Basic info</span>
          </div>
          <div className="d-flex flex-column my-4 gap-4">
            <div className="d-md-flex gap-4">
              <label htmlFor="store-name" className="text-uppercase">
                store name
              </label>
              <input
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                type="text"
                id="store-name"
                placeholder="Store Name"
                className="form-control"
                required
              />
            </div>
            <div className="d-md-flex gap-4">
              <label htmlFor="email" className="text-uppercase">
                email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Email"
                className="form-control"
                required
              />
            </div>
            <div className="d-md-flex gap-4">
              <label htmlFor="mobile" className="text-uppercase">
                mobile
              </label>
              <input
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="text"
                id="mobile"
                placeholder="Mobile"
                className="form-control"
              />
            </div>
            <div className="d-md-flex gap-4">
              <label htmlFor="address" className="text-uppercase">
                address
              </label>
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="address"
                placeholder="Address"
                className="form-control w-100"
              />
            </div>
            <div className="d-md-flex gap-4">
              <label htmlFor="logo" className="text-uppercase">
                logo
              </label>
              <div className="d-flex flex-column gap-4">
                <input
                  onChange={(e) => setLogo(e.target.files?.[0])}
                  type="file"
                  id="logo"
                  className="form-control w-100"
                />
                {logo && (
                  <img
                    src={
                      typeof logo === "string"
                        ? import.meta.env.VITE_APP_API_URL +
                          "/public/uploads/" +
                          logo
                        : URL.createObjectURL(logo)
                    }
                    alt="Logo"
                    width="100px"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="btn btn-secondary d-flex align-items-center ms-auto mb-4"
        >
          {loading ? (
            <BtnLoading color="light" />
          ) : (
            <>
              <i className="bi bi-check fs-5" />
              <span>Update</span>
            </>
          )}
        </button>
      </form>
    </>
  );
}
