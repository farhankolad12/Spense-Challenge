import { useState } from "react";
import SubCategoryList from "./SubCategoryList";
import { Categories, SubCategory, useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";

export default function CategoryList({ category }: { category: Categories }) {
  const [isOpen, setIsOpen] = useState(false);

  const { userData } = useApp();

  const subCategory = userData.subCategory.filter((sub: SubCategory) => {
    return sub.categoryId === category.id;
  });

  return (
    <>
      <button
        className="btn d-flex w-100 justify-content-between align-items-center border-bottom p-3"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${category.id}`}
        aria-controls={`${category.id}`}
      >
        <Link to={"/categories/" + category.name}>{category.name}</Link>
        <i className={`bi bi-chevron-${isOpen ? "down" : "left"}`} />
      </button>
      <div className="collapse" id={`${category.id}`}>
        {subCategory.map((subCategory: SubCategory) => {
          return (
            <SubCategoryList
              parentCategory={category}
              key={subCategory.id}
              category={subCategory}
            />
          );
        })}
      </div>
    </>
  );
}
