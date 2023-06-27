import { Categories, useApp } from "../../context/AppContext";
import CategoryList from "./CategoryList";

export default function CategoriesOffCanvas() {
  const { userData } = useApp();
  return (
    <div
      className="offcanvas offcanvas-start header-offcanvas"
      tabIndex={-1}
      id="categories"
      aria-labelledby="categoriesLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="categoriesLabel">
          Categories
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body p-0">
        {userData.category.map((category: Categories) => {
          return <CategoryList category={category} key={category.id} />;
        })}
      </div>
    </div>
  );
}
