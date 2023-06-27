import { Link } from "react-router-dom";

export type Brand = {
  id: string;
  name: string;
  img: string;
};

export default function TopBrandCom({ brand }: { brand: Brand }) {
  return (
    <Link to={"/brand/" + brand.name}>
      <img
        src={`${import.meta.env.VITE_APP_API_URL}/public/brands/${brand.img}`}
        alt="Logo"
        width="150px"
        height="150px"
        style={{
          borderRadius: "50%",
          border: "1px dashed #dce1e8",
          padding: "2.5rem",
        }}
      />
    </Link>
  );
}
