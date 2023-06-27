import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import InnerSubCategoryRow from "../components/Category/InnerSubCategoryRow";

export type InnerSubCategoryType = {
  id: string;
  name: string;
  categoryId: string;
  subCategoryId: string;
};

export default function InnerSubCategoryPage() {
  const [makeReq, setMakeReq] = useState(0);

  const {
    error,
    loading,
    userData: innerSubCategories,
  } = useGetReq("/category/get-innersubcategory", { makeReq });
  const navigate = useNavigate();

  return (
    <>
      <ErrorCon error={error} />
      <div className="container">
        <div className="p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <span className="fs-4 text-uppercase">Inner subcategory</span>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/inner-subcategory/add")}
            >
              Add Inner subcategory
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
                    Category Name
                  </th>
                  <th scope="col" className="border-end">
                    Subcategory Name
                  </th>
                  <th scope="col" className="border-end">
                    Inner Subcategory Name
                  </th>
                  <th scope="col" className="border-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading && innerSubCategories ? (
                  innerSubCategories.map(
                    (innerSubCategory: InnerSubCategoryType) => {
                      return (
                        <InnerSubCategoryRow
                          setMakeReq={setMakeReq}
                          innerSubCategory={innerSubCategory}
                          key={innerSubCategory.id}
                        />
                      );
                    }
                  )
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
