import { useState, FormEvent, useRef } from "react";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import usePostReq from "../hooks/usePostReq";
import { nanoid } from "nanoid";
import BtnLoading from "../components/Message/BtnLoading";
import SuccessCon from "../components/Message/SuccessCon";

export default function CMSPages({ page }: { page: string }) {
  const [success, setSuccess] = useState("");
  const {
    error,
    loading,
    userData: cmsRes,
  } = useGetReq(`/cms-page/${page.toLowerCase().replaceAll(" ", "-")}`, {
    makeReq: page,
  });

  const {
    error: saveErr,
    execute,
    loading: saveLoading,
    setError,
  } = usePostReq(`/cms-page/save-${page.toLowerCase().replaceAll(" ", "-")}`);

  const textRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const text = textRef.current?.value;

    try {
      const res = await execute({ id: nanoid(), content: text });
      if (!res.success) {
        setError(res.message);
        setTimeout(() => setError(""), 4000);
      }
      setSuccess(`${page} saved!`);
      return setTimeout(() => setSuccess(""), 4000);
    } catch {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={saveErr} />
      <SuccessCon success={success} />
      <div className="container">
        <h3>{page}</h3>
        {!loading
          ? cmsRes && (
              <form onSubmit={handleSubmit} className="bg-white p-4 my-3">
                <div className="d-flex-flex-column gap-1">
                  <label htmlFor={page} className="text-uppercase">
                    {page}
                  </label>
                  <textarea
                    ref={textRef}
                    defaultValue={cmsRes.content}
                    className="form-control"
                    id={page}
                    placeholder={page}
                    rows={7}
                    required
                  />
                </div>
                <div className="py-2 border-top d-flex align-items-end">
                  <button type="submit" className="btn btn-secondary">
                    {saveLoading ? (
                      <BtnLoading color="light" />
                    ) : (
                      <>
                        <i className="bi bi-check2-square" />
                        Update
                      </>
                    )}
                  </button>
                </div>
              </form>
            )
          : "loading..."}
      </div>
    </>
  );
}
