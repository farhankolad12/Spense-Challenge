import { Navigate, useParams } from "react-router-dom";
import useGetReq from "../hooks/useGetReq";
import ProductsAdd from "./ProductsAdd";
import ErrorCon from "../components/Message/ErrorCon";

export default function ProductEdit() {
  const { id } = useParams();

  const {
    error,
    loading,
    userData: product,
  } = useGetReq("/products/get-product-id-edit", { id });

  return (
    <>
      <ErrorCon error={error} />
      {!loading ? (
        product ? (
          <ProductsAdd product={product} />
        ) : (
          <Navigate to="/" />
        )
      ) : (
        "loading..."
      )}
    </>
  );
}
