import { FormEvent, useRef, useState } from "react";
import usePostReq from "../hooks/usePostReq";
import useGetReq from "../hooks/useGetReq";
import { useNavigate } from "react-router-dom";
import BtnLoading from "../components/Message/BtnLoading";
import ErrorCon from "../components/Message/ErrorCon";
import { nanoid } from "nanoid";
import SuccessCon from "../components/Message/SuccessCon";
import { CategoryType } from "./CategoryPage";
import { ProductType } from "./ProductsAdd";

export default function TopBannerAdd() {
  const [success, setSuccess] = useState("");

  const { error, execute, loading, setError } = usePostReq(
    "/home-settings/add-top-banner"
  );

  const {
    error: _error,
    loading: _loading,
    userData: categories,
  } = useGetReq("/category/get-category", {});

  const {
    error: __error,
    loading: __loading,
    userData: products,
  } = useGetReq("/products/get-all-products", {});

  const navigate = useNavigate();

  const typeRef = useRef<HTMLSelectElement>(null);
  const cateogryRef = useRef<HTMLSelectElement>(null);
  const productRef = useRef<HTMLSelectElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const type = typeRef.current?.value;
    const category = cateogryRef.current?.value;
    const product = productRef.current?.value;
    const img = imgRef.current?.files?.[0];

    try {
      if ((product === "0" && category === "0") || type === "0") {
        setError("Please enter one category or product!");
        return setTimeout(() => setError(""), 4000);
      }
      const formData = new FormData();
      formData.append("id", nanoid());
      formData.append("type", type || "");
      formData.append("category", category || "");
      formData.append("product", product || "");
      formData.append("img", img || "");

      const res = await execute(formData);
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      setSuccess("Saved!");
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setError("Something went wrong!");
      return setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={_error} />
      <ErrorCon error={__error} />
      <SuccessCon success={success} />
      {!_loading && !__loading
        ? categories &&
          products && (
            <div className="container">
              <h3>Add Banner</h3>
              <div className="bg-white p-5">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex flex-column gap-1 w-100">
                      <label htmlFor="type">Type *</label>
                      <select
                        required
                        defaultValue="0"
                        ref={typeRef}
                        className="form-control"
                        id="type"
                      >
                        <option disabled value="0">
                          Please select
                        </option>
                        <option value="product">Product</option>
                        <option value="category">Category</option>
                      </select>
                    </div>
                    <div className="d-flex flex-column gap-1 w-100">
                      <label htmlFor="category">Category:</label>
                      <select
                        ref={cateogryRef}
                        className="form-control"
                        id="category"
                        defaultValue="0"
                      >
                        <option disabled value="0">
                          Please select
                        </option>
                        {categories.map((category: CategoryType) => {
                          return (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="d-flex flex-column gap-1 w-100">
                      <label htmlFor="product">Prodcut:</label>
                      <select
                        ref={productRef}
                        className="form-control"
                        id="product"
                        defaultValue="0"
                      >
                        <option disabled value="0">
                          Please select
                        </option>
                        {products.map((product: ProductType) => {
                          return (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="d-flex flex-column gap-1 w-100">
                      <label htmlFor="img">Image *</label>
                      <input
                        required
                        ref={imgRef}
                        type="file"
                        id="img"
                        className="form-control"
                      />
                    </div>
                    <div className="border-top d-flex justify-content-center align-items-center pt-4 gap-4">
                      <button
                        type="button"
                        onClick={() => navigate("/top-banner")}
                        className="btn btn-warning "
                      >
                        <i className="bi bi-x-lg" />
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-secondary">
                        {loading ? (
                          <BtnLoading color="light" />
                        ) : (
                          <>
                            <i className="bi bi-check2-square" />
                            Save
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )
        : "loading..."}
    </>
  );
}
