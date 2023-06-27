import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid/async";
import ErrorCon from "../components/Message/ErrorCon";
import SuccessCon from "../components/Message/SuccessCon";
import BtnLoading from "../components/Message/BtnLoading";
import usePostReq from "../hooks/usePostReq";
import useGetReq from "../hooks/useGetReq";
import { CategoryType } from "./CategoryPage";

export default function SubCategoryAddPage() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [success, setSuccess] = useState("");

  const { error, execute, loading, setError } = usePostReq(
    "/category/add-subcategory"
  );
  const {
    error: getErr,
    loading: getLoading,
    userData: categories,
  } = useGetReq("/category/get-category", {});
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (categoryId === "") {
      setError("Please select a category!");
      return setTimeout(() => setError(""), 4000);
    }

    try {
      const res = await execute({
        id: await nanoid(),
        categoryId,
        name,
      });
      if (!res.success) {
        setError("Something went wrong!");
        return setTimeout(() => setError(""), 4000);
      }
      setSuccess("Category saved!");
      setTimeout(() => setSuccess(""), 4000);
      setName("");
    } catch (err) {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={getErr} />
      <SuccessCon success={success} />
      <div className="container">
        <h3>Add Subcategory</h3>
        <div className="d-flex justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit}
            className="card card-body d-flex flex-column gap-4"
            style={{ maxWidth: "600px" }}
          >
            <div className="d-flex flex-column gap-2">
              <label htmlFor="category-name" className="text-uppercase">
                Category Name
              </label>
              {!getLoading && categories ? (
                <select
                  className="form-control"
                  required
                  onChange={(e) => setCategoryId(e.target.value)}
                  id="category-name"
                >
                  <option selected disabled value="0">
                    Please select a category
                  </option>
                  {categories.map((category: CategoryType) => {
                    return <option value={category.id}>{category.name}</option>;
                  })}
                </select>
              ) : (
                "loading..."
              )}
            </div>
            <div className="d-flex flex-column gap-2">
              <label htmlFor="name" className="text-uppercase">
                Subcategory Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                type="text"
                id="name"
                required
                placeholder="Enter category name"
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
                type="submit"
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
