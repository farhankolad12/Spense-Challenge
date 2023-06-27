import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../pages/ProductsAdd";
import usePostReq from "../../hooks/usePostReq";
import ErrorCon from "../Message/ErrorCon";
import SuccessCon from "../Message/SuccessCon";

export default function ProductRow({
  product,
  setMakeReq,
}: {
  product: ProductType;
  setMakeReq: Function;
}) {
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const { error, execute, loading, setError } = usePostReq(
    "/products/delete-product"
  );

  async function handleDelete() {
    try {
      const res = await execute({ id: product.id });
      if (res.success) {
        setSuccess("Product Deleted!");
        setMakeReq(Math.floor(Math.random() * 9999));
        return setTimeout(() => setSuccess(""), 4000);
      }
      setError(res.message);
      setTimeout(() => setError(""), 4000);
    } catch {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <tr>
        <td className="border-end">{product.id}</td>
        <td className="border-end">{product.category.name}</td>
        <td className="border-end">{product.subCategory.name}</td>
        <td className="border-end">{product.innerSubCategory.name}</td>
        <td className="border-end">{product.name}</td>
        <td className="border-end">
          <button
            onClick={() => navigate(`/products/edit/${product.id}`)}
            className="btn"
          >
            <i className="bi bi-pen text-warning fs-5"></i>
          </button>
          <button disabled={loading} onClick={handleDelete} className="btn">
            {loading ? (
              "loading..."
            ) : (
              <i className="bi bi-trash text-danger fs-5"></i>
            )}
          </button>
        </td>
      </tr>
    </>
  );
}
