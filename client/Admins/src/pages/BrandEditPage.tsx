import { FormEvent, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ErrorCon from "../components/Message/ErrorCon";
import BtnLoading from "../components/Message/BtnLoading";
import useGetReq from "../hooks/useGetReq";
import usePostReq from "../hooks/usePostReq";

export default function BrandEditPage() {
  const [name, setName] = useState("");
  const [img, setImg] = useState<File | undefined>();

  const { id } = useParams();

  const {
    error: getErr,
    loading: getLoading,
    userData: brand,
  } = useGetReq("/brand/get-brand-id", { id });
  const { error, execute, loading, setError } = usePostReq("/brand/add-brand");

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", id || "");
      formData.append("name", name || brand.name);
      formData.append("img", img || brand.img);

      const res = await execute(formData);
      if (!res.success) {
        setError("Something went wrong!");
        return setTimeout(() => setError(""), 4000);
      }
      navigate("/brand");
    } catch (err) {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={getErr} />
      <div className="container">
        <h3>Edit category</h3>
        <div className="d-flex justify-content-center align-items-center">
          {!getLoading ? (
            brand ? (
              <form
                onSubmit={handleSubmit}
                className="card card-body d-flex flex-column gap-4"
                style={{ maxWidth: "600px" }}
              >
                <div className="d-flex flex-column gap-2">
                  <label htmlFor="name" className="text-uppercase">
                    Brand Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    type="text"
                    id="name"
                    placeholder={brand.name}
                  />
                </div>
                <div className="d-flex flex-column gap-2">
                  <label htmlFor="img" className="text-uppercase">
                    image
                  </label>
                  <input
                    onChange={(e) => setImg(e.target.files?.[0])}
                    className="form-control"
                    type="file"
                    id="img"
                    accept="image/*"
                  />
                  <img
                    src={
                      import.meta.env.VITE_APP_API_URL +
                      "/public/brands/" +
                      brand.img
                    }
                    width="50px"
                    alt="Brand"
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center gap-4 border-top pt-4">
                  <button
                    disabled={loading}
                    onClick={() => navigate("/category")}
                    className="btn btn-success d-flex gap-2 align-items-center"
                  >
                    {loading ? (
                      <BtnLoading color="light" />
                    ) : (
                      <>
                        <span>
                          <i className="bi bi-x-lg"></i>
                        </span>
                        <span>Cancel</span>
                      </>
                    )}
                  </button>
                  <button
                    disabled={loading}
                    className="btn btn-secondary d-flex gap-2 align-items-center"
                  >
                    {loading ? (
                      <BtnLoading color="light" />
                    ) : (
                      <>
                        <span>
                          <i className="bi bi-check-lg"></i>
                        </span>
                        <span>Save</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <Navigate to="/" />
            )
          ) : (
            "loading..."
          )}
        </div>
      </div>
    </>
  );
}
