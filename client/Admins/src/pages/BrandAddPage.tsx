import { useState, FormEvent } from "react";
import { nanoid } from "nanoid";
import ErrorCon from "../components/Message/ErrorCon";
import SuccessCon from "../components/Message/SuccessCon";
import BtnLoading from "../components/Message/BtnLoading";
import usePostReq from "../hooks/usePostReq";
import { useNavigate } from "react-router-dom";

export default function BrandAddPage() {
  const [name, setName] = useState("");
  const [img, setImg] = useState<File | undefined>();
  const [success, setSuccess] = useState("");

  const { error, execute, loading, setError } = usePostReq("/brand/add-brand");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", nanoid());
      formData.append("name", name);
      formData.append("img", img || "");

      const res = await execute(formData);
      if (!res.success) {
        setError("Something went wrong!");
        return setTimeout(() => setError(""), 4000);
      }
      setSuccess("Brand saved!");
      setTimeout(() => setSuccess(""), 4000);
      setName("");
      setImg(undefined);
    } catch (err) {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <div className="container">
        <h3>Add brand</h3>
        <div className="d-flex justify-content-center align-items-center">
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
                required
                placeholder="Enter brand name"
              />
            </div>
            <div className="d-flex flex-column gap-2">
              <label htmlFor="img" className="text-uppercase">
                image
              </label>
              <input
                required
                onChange={(e) => setImg(e.target.files?.[0])}
                className="form-control"
                type="file"
                id="img"
                accept="image/*"
              />
            </div>
            <div className="d-flex align-items-center justify-content-center gap-4 border-top pt-4">
              <button
                disabled={loading}
                onClick={() => navigate("/brand")}
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
        </div>
      </div>
    </>
  );
}
