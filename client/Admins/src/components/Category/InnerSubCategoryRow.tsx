import { useState } from "react";
import { InnerSubCategoryType } from "../../pages/InnerSubCategoryPage";
import ErrorCon from "../Message/ErrorCon";
import SuccessCon from "../Message/SuccessCon";
import useGetReq from "../../hooks/useGetReq";
import usePostReq from "../../hooks/usePostReq";
import { useNavigate } from "react-router-dom";

export default function InnerSubCategoryRow({
  innerSubCategory,
  setMakeReq,
}: {
  innerSubCategory: InnerSubCategoryType;
  setMakeReq: Function;
}) {
  const [success, setSuccess] = useState("");

  const {
    error,
    loading,
    userData: category,
  } = useGetReq("/category/get-category-id", {
    id: innerSubCategory.categoryId,
  });
  const {
    error: subErr,
    loading: subLoading,
    userData: subCategory,
  } = useGetReq("/category/get-subcategory-id", {
    id: innerSubCategory.subCategoryId,
  });

  const navigate = useNavigate();

  const {
    error: postErr,
    execute,
    loading: postLoading,
    setError,
  } = usePostReq("/category/delete-innersubcateogry");

  async function handleDelete() {
    try {
      const res = await execute({ id: innerSubCategory.id });
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

  return !loading && !subLoading && category && subCategory ? (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={postErr} />
      <ErrorCon error={subErr} />
      <SuccessCon success={success} />
      <tr key={innerSubCategory.id}>
        <td className="border-end">
          <span>{innerSubCategory.id}</span>
        </td>
        <td className="border-end">
          <span>{category.name}</span>
        </td>
        <td className="border-end">
          <span>{subCategory.name}</span>
        </td>
        <td className="border-end">
          <span>{innerSubCategory.name}</span>
        </td>
        <td className="border-end">
          <button
            className="btn"
            onClick={() =>
              navigate(
                `/inner-subcategory/edit/${innerSubCategory.id}/${subCategory.id}/${category.id}`
              )
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
