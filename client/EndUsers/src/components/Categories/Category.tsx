import { Link, useParams } from "react-router-dom";
import {
  Categories,
  ProductType,
  SubCategory,
  useApp,
} from "../../context/AppContext";
import Product from "../Home/Product";
import "../../css/products.css";
import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";

export default function Category() {
  const { category } = useParams();
  const { userData } = useApp();

  const givenCategory = userData.category.filter((cat: Categories) => {
    return cat.name === category;
  })[0];

  const subCategory = userData.subCategory.filter(
    (selectedCategory: SubCategory) => {
      return selectedCategory.categoryId === givenCategory.id;
    }
  );

  const {
    error,
    loading,
    userData: products,
  } = useGetReq("/products/get-by-categories", {
    category,
  });

  return (
    <>
      <ErrorCon error={error} />
      <div>
        <div className="bg-white py-2">
          <div className="container">
            <div className="d-flex align-items-center gap-3">
              <Link to="/">
                <i className="bi bi-house fs-5" />
              </Link>
              <span>/</span>
              <span>{category}</span>
            </div>
          </div>
        </div>
        <div className="container-fluid d-md-flex align-items-start gap-3 my-5">
          <div className="card ">
            <div className="card-header">
              <Link to="/categories" className="d-flex gap-3 fs-4 text-dark">
                <span>
                  <i className="bi bi-arrow-left" />
                </span>
                <span>All Categories</span>
              </Link>
            </div>
            <div className="card-body">
              <strong>
                <small>{category}</small>
              </strong>
              <ul style={{ listStyle: "square inside" }}>
                {subCategory.map((selectedSubCategory: SubCategory) => {
                  return (
                    <li key={selectedSubCategory.id}>
                      <Link
                        className="text-dark"
                        to={`/categories/${category}/${selectedSubCategory.name}`}
                      >
                        {selectedSubCategory.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-end align-items-center gap-3">
              <span>Sort</span>
              <select className="form-select w-auto">
                <option value="new-arrivals">New Arrivals</option>
                <option value="rating-high">Rating: High to Low</option>
                <option value="rating-low">Rating: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
            <div className="products-lists">
              {!loading
                ? products
                  ? products.map((product: ProductType) => {
                      return <Product key={product.id} product={product} />;
                    })
                  : "No Products Found!"
                : "loading"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
