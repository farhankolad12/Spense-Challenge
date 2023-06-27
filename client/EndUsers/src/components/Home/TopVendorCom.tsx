import { Link } from "react-router-dom";

export type Vendor = {
  id: string;
  logo: string;
  storeName: string;
};

export default function TopVendorCom({ vendor }: { vendor: Vendor }) {
  return (
    <div className="bg-white text-center py-3">
      <Link to={"/vendor/" + vendor.id} className="d-flex flex-column ">
        <img
          src={`${import.meta.env.VITE_APP_API_URL}/public/uploads/${
            vendor.logo
          }`}
          alt="Logo"
          width="150px"
          height="150px"
        />
        <span>{vendor.storeName}</span>
      </Link>
    </div>
  );
}
