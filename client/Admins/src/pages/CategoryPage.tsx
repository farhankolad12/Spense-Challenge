import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import CategoryRow from "../components/Category/CategoryRow";

export type CategoryType = {
  id: string;
  name: string;
  img: string;
};

export default function CategoryPage() {
  const [makeReq, setMakeReq] = useState(0);
  const navigate = useNavigate();

  const {
    error,
    loading,
    userData: categories,
  } = useGetReq("/category/get-category", { makeReq });

  return (
    <>
      <ErrorCon error={error} />
      <div className="container">
        <div className="p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <span className="fs-4 text-uppercase">Category</span>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/category/add")}
            >
              Add Category
            </button>
          </div>
          <form className="d-flex">
            <input
              type="text"
              className="form-control rounded-start-pill"
              placeholder="Type & Enter"
            />
            <button type="submit" className="btn btn-light rounded-start-0">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <div className="table-responsive">
            <table className="table table-striped border my-4">
              <thead>
                <tr>
                  <th scope="col" className="border-end">
                    #
                  </th>
                  <th scope="col" className="border-end">
                    Image
                  </th>
                  <th scope="col" className="border-end">
                    Category Name
                  </th>
                  <th scope="col" className="border-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading && categories ? (
                  categories.map((category: CategoryType) => {
                    return (
                      <CategoryRow
                        setMakeReq={setMakeReq}
                        category={category}
                        key={category.id}
                      />
                    );
                  })
                ) : (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
