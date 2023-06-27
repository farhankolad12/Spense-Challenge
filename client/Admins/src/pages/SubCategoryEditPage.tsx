import { FormEvent, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ErrorCon from "../components/Message/ErrorCon";
import SuccessCon from "../components/Message/SuccessCon";
import BtnLoading from "../components/Message/BtnLoading";
import usePostReq from "../hooks/usePostReq";
import useGetReq from "../hooks/useGetReq";
import { CategoryType } from "./CategoryPage";

export default function SubCategoryEditPage() {
  const { subcategoryId, categoryId } = useParams();

  const [CategoryId, setCategoryId] = useState(categoryId);

  const {
    userData: category,
    error: categoryErr,
    loading: categoryLoading,
  } = useGetReq("/category/get-category-id", {
    id: categoryId,
  });
  const { userData: categories } = useGetReq("/category/get-category", {
    id: categoryId,
  });
  const {
    userData: subcategory,
    error: subcategoryErr,
    loading: subcategoryLoading,
  } = useGetReq("/category/get-subcategory-id", {
    id: subcategoryId,
  });
  const { error, execute, loading, setError } = usePostReq(
    "/category/add-subcategory"
  );
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (name === "" || CategoryId === "") {
      setError("Please select category!");
      setTimeout(() => setError(""), 4000);
    }

    try {
      const data = {
        id: subcategoryId,
        categoryId: CategoryId,
        name,
      };
      const res = await execute(data);
      if (!res.success) {
        setError("Something went wrong!");
        return setTimeout(() => setError(""), 4000);
      }
      setSuccess("Sub Category edited!");
      setTimeout(() => setSuccess(""), 4000);
      navigate("/category");
    } catch (err) {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={categoryErr} />
      <ErrorCon error={subcategoryErr} />
      <SuccessCon success={success} />
      <div className="container">
        <h3>Edit subcategory</h3>
        <div className="d-flex justify-content-center align-items-center">
          {!subcategoryLoading && !categoryLoading ? (
            category && subcategory ? (
              <form
                onSubmit={handleSubmit}
                className="card card-body d-flex flex-column gap-4"
                style={{ maxWidth: "600px" }}
              >
                <div className="d-flex flex-column gap-2">
                  <label htmlFor="name" className="text-uppercase">
                    Category
                  </label>
                  <select
                    onChange={(e) => setCategoryId(e.target.value)}
                    defaultValue={categoryId}
                    id="category"
                  >
                    {categories.map((category: CategoryType) => {
                      return (
                        <option value={category.id}>{category.name}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="d-flex flex-column gap-2">
                  <label htmlFor="name" className="text-uppercase">
                    Subcategory Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={subcategory.name}
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
                        <span>Update</span>
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
