import { Link } from "react-router-dom";
import { Categories, SubCategory, useApp } from "../../context/AppContext";
import SubCategoryPageCom from "./SubCategoryPageCom";

export default function CategoryPageCom({
  category,
}: {
  category: Categories;
}) {
  const { userData } = useApp();

  const subCategory = userData.subCategory.filter((sub: SubCategory) => {
    return sub.categoryId === category.id;
  });

  return (
    <div
      key={category.id}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h3 className="text-center fw-bold mb-4">
        <Link className="text-dark" to={"/categories/" + category.name}>
          {category.name}
        </Link>
      </h3>
      <div className="d-flex flex-wrap gap-5  ">
        {subCategory.map((subCategory: SubCategory) => {
          return (
            <SubCategoryPageCom
              category={category}
              subCategory={subCategory}
              key={subCategory.id}
            />
          );
        })}
      </div>
    </div>
  );
}
