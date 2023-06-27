import { useState } from "react";
import InnerCategoryList from "./InnerCategoryList";
import {
  Categories,
  InnerSubCategory,
  SubCategory,
  useApp,
} from "../../context/AppContext";
import { Link } from "react-router-dom";

export default function SubCategoryList({
  category,
  parentCategory,
}: {
  category: SubCategory;
  parentCategory: Categories;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { userData } = useApp();

  const innerSubCategory = userData.innerSubCategory.filter(
    (inner: InnerSubCategory) => {
      return (
        inner.subCategoryId === category.id &&
        inner.categoryId === parentCategory.id
      );
    }
  );

  return (
    <>
      <button
        className="btn d-flex w-100 justify-content-between align-items-center border-bottom p-3"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        data-bs-toggle="collapse"
        data-bs-target={`#${category.id}`}
        aria-expanded="false"
        aria-controls={`${category.id}`}
      >
        <div className="d-flex gap-2 align-items-center">
          <span className="fs-5">-</span>
          <Link to={"/categories/" + parentCategory.name + "/" + category.name}>
            {category.name}
          </Link>
        </div>
        <i className={`bi bi-chevron-${isOpen ? "down" : "left"}`} />
      </button>
      <div className="collapse" id={`${category.id}`}>
        {innerSubCategory.map((innerSubCategory: InnerSubCategory) => {
          return (
            <InnerCategoryList
              subCategory={category}
              parentCategory={parentCategory}
              key={innerSubCategory.id}
              category={innerSubCategory}
            />
          );
        })}
      </div>
    </>
  );
}
