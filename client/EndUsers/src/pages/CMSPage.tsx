import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Auth/ErrorCon";
import { Link } from "react-router-dom";

export default function CMSPage({ page }: { page: string }) {
  const {
    error,
    loading,
    userData: cmsRes,
  } = useGetReq(`/cms-page/${page.toLowerCase().replace(" ", "-")}`, {
    makeReq: page,
  });

  return !loading
    ? cmsRes && (
        <>
          <ErrorCon error={error} />
          <div className="bg-white">
            <div className="container">
              <div className="d-flex align-items-center gap-2">
                <Link to="/">
                  <i className="bi bi-house" />
                </Link>
                <span>/</span>
                <span>{page}</span>
              </div>
            </div>
            <div className="container">
              <h3 className="fw-bold text-center">{page}</h3>
              <div className="my-3">
                <p>{cmsRes.content}</p>
              </div>
            </div>
          </div>
        </>
      )
    : "loading...";
}
