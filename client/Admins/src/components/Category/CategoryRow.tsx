import { useState } from "react";
import usePostReq from "../../hooks/usePostReq";
import { CategoryType } from "../../pages/CategoryPage";
import ErrorCon from "../Message/ErrorCon";
import SuccessCon from "../Message/SuccessCon";
import { useNavigate } from "react-router-dom";

export default function CategoryRow({
  category,
  setMakeReq,
}: {
  category: CategoryType;
  setMakeReq: Function;
}) {
  const [success, setSuccess] = useState("");

  const { error, execute, loading, setError } = usePostReq(
    "/category/delete-category"
  );

  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const res = await execute({ id: category.id });
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      setSuccess("Deleted!");
      setMakeReq(Math.floor(Math.random() * 777777));
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setError("Something went wrong!");
      return setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <tr key={category.id}>
        <td className="border-end">
          <span>{category.id}</span>
        </td>
        <td className="border-end">
          <img
            src={
              import.meta.env.VITE_APP_API_URL +
              "/public/category/" +
              category.img
            }
            width="50px"
            alt="Category"
          />
        </td>
        <td className="border-end">
          <span>{category.name}</span>
        </td>
        <td className="border-end">
          <button
            className="btn"
            onClick={() => navigate("/category/edit/" + category.id)}
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
