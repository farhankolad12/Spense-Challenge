import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductType } from "./ProductsAdd";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import ProductRow from "../components/Products/ProductRow";

export default function VednorProducts() {
  const [makeReq, setMakeReq] = useState(0);

  const navigate = useNavigate();

  const {
    error,
    loading,
    userData: products,
  } = useGetReq("/products/get-products", { makeReq });

  return (
    <>
      <ErrorCon error={error} />
      <div className="container">
        <div className="p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <span className="fs-4 text-uppercase">products</span>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/products/add")}
            >
              Add Products
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
                    Cateogry
                  </th>
                  <th scope="col" className="border-end">
                    Subcategory
                  </th>
                  <th scope="col" className="border-end">
                    Inner Subcategory
                  </th>
                  <th scope="col" className="border-end">
                    Product
                  </th>
                  <th scope="col" className="border-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  products ? (
                    products.map((product: ProductType) => {
                      return (
                        <ProductRow
                          setMakeReq={setMakeReq}
                          key={product.id}
                          product={product}
                        />
                      );
                    })
                  ) : (
                    "No Products Found"
                  )
                ) : (
                  <tr>
                    <td>loading</td>
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
