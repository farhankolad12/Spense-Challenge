import { FormEvent, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePostReq from "../hooks/usePostReq";
import { nanoid } from "nanoid";
import ErrorCon from "../components/Message/ErrorCon";
import BtnLoading from "../components/Message/BtnLoading";
import SuccessCon from "../components/Message/SuccessCon";

export default function SliderAdd() {
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const { error, execute, loading, setError } = usePostReq(
    "/home-settings/save-sliders"
  );

  const imgRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();

      const img = imgRef.current?.files?.[0];
      const link = linkRef.current?.value;

      formData.append("id", nanoid());
      formData.append("img", img || "");
      formData.append("link", link || "");

      const res = await execute(formData);
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      setSuccess("Slider saved!");
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <div className="container">
        <h3>Add Slider</h3>
        <div className="bg-white p-5">
          <form onSubmit={handleSubmit}>
            <div className="d-md-flex gap-5 mb-5">
              <div className="d-flex flex-column gap-1 w-100">
                <label htmlFor="img">Image</label>
                <input
                  type="file"
                  id="img"
                  ref={imgRef}
                  className="form-control"
                  required
                />
              </div>
              <div className="d-flex flex-column gap-1 w-100">
                <label htmlFor="link">Link</label>
                <input
                  ref={linkRef}
                  type="url"
                  id="link"
                  placeholder="Link"
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="border-top d-flex justify-content-center align-items-center pt-4 gap-4">
              <button
                type="button"
                onClick={() => navigate("/sliders")}
                className="btn btn-warning "
              >
                <i className="bi bi-x-lg" />
                Cancel
              </button>
              <button type="submit" className="btn btn-secondary">
                {loading ? (
                  <BtnLoading color="light" />
                ) : (
                  <>
                    <i className="bi bi-check2-square" />
                    Save
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
