import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorCon from "../components/Message/ErrorCon";
import AttributeRow from "../components/Attribute/AttributeRow";
import useGetReq from "../hooks/useGetReq";

export type AttributeType = {
  id: string;
  name: string;
};

export default function AttributePage() {
  const [makeReq, setMakeReq] = useState(0);

  const {
    error,
    loading,
    userData: attributes,
  } = useGetReq("/attributes/get-attribute", { makeReq });

  const navigate = useNavigate();

  return (
    <>
      <ErrorCon error={error} />
      <div className="container">
        <div className="p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <span className="fs-4 text-uppercase">attributes</span>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/attribute/add")}
            >
              Add Attributes
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
                    Attribute
                  </th>
                  <th scope="col" className="border-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading && attributes ? (
                  attributes.map((attribute: AttributeType) => {
                    return (
                      <AttributeRow
                        attribute={attribute}
                        key={attribute.id}
                        setMakeReq={setMakeReq}
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
