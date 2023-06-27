import { Link } from "react-router-dom";
import {
  Categories,
  InnerSubCategory,
  SubCategory,
} from "../../context/AppContext";

export default function InnerCategoryList({
  category,
  subCategory,
  parentCategory,
}: {
  category: InnerSubCategory;
  subCategory: SubCategory;
  parentCategory: Categories;
}) {
  return (
    <button
      className="btn d-flex w-100 justify-content-between align-items-center border-bottom p-3"
      type="button"
    >
      <Link
        to={
          "/categories/" +
          parentCategory.name +
          "/" +
          subCategory.name +
          "/" +
          category.name
        }
        className="d-flex gap-2 align-items-center text-decoration-none text-dark"
      >
        <span className="fs-5">--</span>
        <span>{category.name}</span>
      </Link>
    </button>
  );
}
