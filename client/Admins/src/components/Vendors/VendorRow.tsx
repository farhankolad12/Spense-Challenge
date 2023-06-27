import { useNavigate } from "react-router-dom";
import usePostReq from "../../hooks/usePostReq";
import { useAuth } from "../../context/AuthProvider";
import ErrorCon from "../Message/ErrorCon";
import BtnLoading from "../Message/BtnLoading";

export type Vendor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  logo: string;
};

export default function VendorRow({ vendor }: { vendor: Vendor }) {
  const navigate = useNavigate();

  const { error, execute, loading, setError } = usePostReq(
    "/super-admins/login-vendor"
  );

  const { authStateChange } = useAuth();

  async function handleLogin() {
    try {
      const res = await execute({ id: vendor.id });
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      await authStateChange();
    } catch {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <tr>
        <td>{vendor.id}</td>
        <td>
          <img
            src={
              vendor.logo
                ? import.meta.env.VITE_APP_API_URL +
                  "/public/uploads/" +
                  vendor.logo
                : import.meta.env.VITE_APP_API_URL +
                  "/public/defaultProfile.png"
            }
            alt="Logo"
            width="80px"
          />
        </td>
        <td>{vendor.firstName + " " + vendor.lastName}</td>
        <td>{vendor.email}</td>
        <td>+91 {vendor.mobile}</td>
        <td>
          <div className="d-flex gap-4">
            <button
              onClick={() => navigate("/vendor-detail/" + vendor.id)}
              className="btn btn-warning"
            >
              View
            </button>
            <button onClick={handleLogin} className="btn btn-primary">
              {loading ? <BtnLoading color="light" /> : "Login"}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
