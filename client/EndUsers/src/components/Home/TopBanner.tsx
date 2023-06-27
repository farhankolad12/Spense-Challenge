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

export default function TopBanner() {
  const {
    error,
    loading,
    userData: topBanners,
  } = useGetReq("/home-settings/get-top-banner", {});

  return (
    <>
      <ErrorCon error={error} />
      {!loading ? (
        <div className="d-md-flex align-items-center justify-content-between container-fluid gap-5 my-5">
          {topBanners.map((banner: Banners) => {
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
                  height="320px"
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
      ) : (
        "Loading Component"
      )}
    </>
  );
}
