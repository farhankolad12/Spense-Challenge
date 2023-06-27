import { Link } from "react-router-dom";
import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";

type Banners = {
  id: string;
  img: string;
  type: string;
  category: string;
  product: string;
};

export default function LargeBanner() {
  const {
    error,
    loading,
    userData: largeBanner,
  } = useGetReq("/home-settings/get-large-banner", {});

  return !loading ? (
    <>
      <ErrorCon error={error} />
      <div className="mt-4">
        {largeBanner.map((banner: Banners) => {
          return (
            <Link
              to={
                banner.type === "product"
                  ? "/product/" + banner.product
                  : "/categories/" + banner.category
              }
              key={banner.id}
            >
              <img
                width="100%"
                src={
                  import.meta.env.VITE_APP_API_URL +
                  "/public/sliders/" +
                  banner.img
                }
                alt={banner.id}
              />
            </Link>
          );
        })}
      </div>
    </>
  ) : (
    "Loading Component..."
  );
}
