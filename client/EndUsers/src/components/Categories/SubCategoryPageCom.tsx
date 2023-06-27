import { Link } from "react-router-dom";
import {
  Categories,
  InnerSubCategory,
  SubCategory,
  useApp,
} from "../../context/AppContext";

export default function SubCategoryPageCom({
  subCategory,
  category,
}: {
  subCategory: SubCategory;
  category: Categories;
}) {
  const { userData } = useApp();

  const innerSubCategory = userData.innerSubCategory.filter(
    (inner: InnerSubCategory) => {
      return (
        inner.subCategoryId === subCategory.id &&
        inner.categoryId === category.id
      );
    }
  );

  return (
    <div key={subCategory.id}>
      <strong>
        <Link
          className="text-dark"
          to={"/categories/" + category.name + "/" + subCategory.name}
        >
          {subCategory.name}
        </Link>
      </strong>
      <ul style={{ listStyle: "none" }}>
        {innerSubCategory.map((innerSubCategory: InnerSubCategory) => {
          return (
            <li key={innerSubCategory.id}>
              <Link
                to={
                  "/categories/" +
                  category.name +
                  "/" +
                  subCategory.name +
                  "/" +
                  innerSubCategory.name
                }
                className="text-dark"
              >
                {innerSubCategory.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
