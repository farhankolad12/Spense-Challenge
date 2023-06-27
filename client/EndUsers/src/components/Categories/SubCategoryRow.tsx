import { Link } from "react-router-dom";
import {
  Categories,
  InnerSubCategory,
  SubCategory,
  useApp,
} from "../../context/AppContext";

export default function SubCategoryRow({
  subcategory,
  category,
}: {
  subcategory: SubCategory;
  category: Categories;
}) {
  const { userData } = useApp();

  const innerSubCategory = userData.innerSubCategory.filter(
    (inner: InnerSubCategory) => {
      return (
        inner.subCategoryId === subcategory.id &&
        inner.categoryId === category.id
      );
    }
  );

  return (
    <li>
      <Link
        className="dropdown-item"
        to={`/categories/${category.name}/${subcategory.name}`}
      >
        {subcategory.name} &raquo;{" "}
      </Link>
      <ul className="dropdown-menu dropdown-submenu">
        {innerSubCategory.map((innersubcategory: InnerSubCategory) => {
          return (
            <Link
              key={innersubcategory.id}
              className="dropdown-item"
              to={`/categories/${category.name}/${innersubcategory.name}`}
            >
              {innersubcategory.name}
            </Link>
          );
        })}
      </ul>
    </li>
  );
}
