import { Link } from "react-router-dom";
import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";

type Sliders = {
  id: string;
  img: string;
  link: string;
};

export default function HomeCarousel() {
  const {
    error,
    loading,
    userData: sliders,
  } = useGetReq("/home-settings/get-sliders", {});

  return (
    <>
      <ErrorCon error={error} />
      {!loading ? (
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            {sliders.map((sld: Sliders, i: number) => {
              return (
                <button
                  key={sld.id}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={`${i}`}
                  className={i === 0 ? "active" : ""}
                  aria-current="true"
                  aria-label={`Slide ${i}`}
                ></button>
              );
            })}
          </div>
          <div className="carousel-inner">
            {sliders.map((sld: Sliders, i: number) => {
              return (
                <Link key={sld.id} target="_blank" to={sld.link}>
                  <div
                    key={i}
                    className={`carousel-item ${i === 0 ? "active" : ""}`}
                  >
                    <img
                      src={
                        import.meta.env.VITE_APP_API_URL +
                        "/public/sliders/" +
                        sld.img
                      }
                      className="d-block w-100"
                      alt="Sliders"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        "Loading Component"
      )}
    </>
  );
}
