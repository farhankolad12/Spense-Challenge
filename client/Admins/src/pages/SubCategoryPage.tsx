import { useState } from "react";
import ErrorCon from "../components/Message/ErrorCon";
import useGetReq from "../hooks/useGetReq";
import { useNavigate } from "react-router-dom";
import SubCategoryRow from "../components/Category/SubCategoryRow";

export type SubCategoryType = {
  id: string;
  name: string;
  categoryId: string;
};

export default function SubCategoryPage() {
  const [makeReq, setMakeReq] = useState(0);

  const {
    error,
    loading,
    userData: categories,
  } = useGetReq("/category/get-subcategory", { makeReq });
  const navigate = useNavigate();

  return (
    <>
      <ErrorCon error={error} />
      <div className="container">
        <div className="p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <span className="fs-4 text-uppercase">subcategory</span>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/subcategory/add")}
            >
              Add Subcategory
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
                  categories.map((subcategory: SubCategoryType) => {
                    return (
                      <SubCategoryRow
                        setMakeReq={setMakeReq}
                        subcategory={subcategory}
                        key={subcategory.id}
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
