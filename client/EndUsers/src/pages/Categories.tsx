import { Link } from "react-router-dom";
import { Categories as CategoriesType, useApp } from "../context/AppContext";
import CategoryPageCom from "../components/Categories/CategoryPageCom";

export default function Categories() {
  const { userData } = useApp();
  return (
    <div>
      <div className="bg-white py-2">
        <div className="container">
          <div className="d-flex gap-2 align-items-center">
            <Link to="/">
              <i className="bi bi-house fs-5" />
            </Link>
            <span>/</span>
            <span>Category</span>
          </div>
        </div>
      </div>
      <div className="container">
        {userData.category.map((category: CategoriesType) => {
          return <CategoryPageCom key={category.id} category={category} />;
        })}
      </div>
    </div>
  );
}
