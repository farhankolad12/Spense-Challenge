import { Link } from "react-router-dom";
import { Categories, SubCategory, useApp } from "../../context/AppContext";
import SubCategoryRow from "./SubCategoryRow";

export default function CategoryRow({ category }: { category: Categories }) {
  const { userData } = useApp();

  const subCategory = userData.subCategory.filter((sub: SubCategory) => {
    return sub.categoryId === category.id;
  });

  return (
    <li>
      <Link className="dropdown-item" to={`/categories/${category.name}`}>
        {category.name} &raquo;
      </Link>
      <ul className="dropdown-menu dropdown-submenu">
        {subCategory.map((subcategory: SubCategory) => {
          return (
            <SubCategoryRow
              category={category}
              subcategory={subcategory}
              key={subcategory.id}
            />
          );
        })}
      </ul>
    </li>
  );
}
