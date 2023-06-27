import { useState } from "react";
import ErrorCon from "../Message/ErrorCon";
import SuccessCon from "../Message/SuccessCon";
import { BrandType } from "../../pages/BrandPage";
import usePostReq from "../../hooks/usePostReq";
import { useNavigate } from "react-router-dom";

export default function BrandRow({
  brand,
  setMakeReq,
}: {
  brand: BrandType;
  setMakeReq: Function;
}) {
  const [success, setSuccess] = useState("");

  const { error, execute, loading, setError } = usePostReq(
    "/brand/delete-brand"
  );

  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const res = await execute({ id: brand.id });
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      setSuccess("Deleted!");
      setTimeout(() => setSuccess(""), 4000);
      setMakeReq(Math.floor(Math.random() * 777777));
    } catch {
      setError("Something went wrong!");
      return setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <tr key={brand.id}>
        <td className="border-end">
          <span>{brand.id}</span>
        </td>
        <td className="border-end">
          <img
            src={
              import.meta.env.VITE_APP_API_URL + "/public/brands/" + brand.img
            }
            width="50px"
            alt="brand"
          />
        </td>
        <td className="border-end">
          <span>{brand.name}</span>
        </td>
        <td className="border-end">
          <button
            className="btn"
            onClick={() => navigate("/brand/edit/" + brand.id)}
          >
            <i className="bi bi-pen fs-5 text-warning" />
          </button>
          <button disabled={loading} className="btn" onClick={handleDelete}>
            {loading ? (
              "loading..."
            ) : (
              <i className="bi bi-trash fs-5 text-danger" />
            )}
          </button>
        </td>
      </tr>
    </>
  );
}
