import { useState } from "react";
import ErrorCon from "../Message/ErrorCon";
import SuccessCon from "../Message/SuccessCon";
import useGetReq from "../../hooks/useGetReq";
import { useNavigate } from "react-router-dom";
import { SubCategoryType } from "../../pages/SubCategoryPage";
import usePostReq from "../../hooks/usePostReq";

export default function SubCategoryRow({
  subcategory,
  setMakeReq,
}: {
  subcategory: SubCategoryType;
  setMakeReq: Function;
}) {
  const [success, setSuccess] = useState("");

  const {
    error: postErr,
    execute,
    loading: postLoading,
    setError,
  } = usePostReq("/category/delete-subcategory");
  const {
    error,
    loading,
    userData: category,
  } = useGetReq("/category/get-category-id", { id: subcategory.categoryId });
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const res = await execute({ id: subcategory.id });
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

  return !loading && category ? (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={postErr} />
      <SuccessCon success={success} />
      <tr key={subcategory.id}>
        <td className="border-end">
          <span>{subcategory.id}</span>
        </td>
        <td className="border-end">
          <span>{category.name}</span>
        </td>
        <td className="border-end">
          <span>{subcategory.name}</span>
        </td>
        <td className="border-end">
          <button
            className="btn"
            onClick={() =>
              navigate(`/subcategory/edit/${subcategory.id}/${category.id}`)
            }
          >
            <i className="bi bi-pen fs-5 text-warning" />
          </button>
          <button disabled={postLoading} className="btn" onClick={handleDelete}>
            {postLoading ? (
              "loading..."
            ) : (
              <i className="bi bi-trash fs-5 text-danger" />
            )}
          </button>
        </td>
      </tr>
    </>
  ) : (
    "loading..."
  );
}
