import { useAuth } from "../context/AuthProvider";
import VendorHome from "./VendorHome";
import AdminHome from "./AdminHome";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="height-100">
      {currentUser?.type === "admin" ? <AdminHome /> : <VendorHome />}
    </div>
  );
}
