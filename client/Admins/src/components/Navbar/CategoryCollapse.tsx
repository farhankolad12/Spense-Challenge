import { CustomLink } from "./SideBar";

export default function CategoryCollapse() {
  return (
    <>
      <button
        className="nav_link btn w-100 d-flex justify-content-between"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#category"
        aria-expanded="false"
        aria-controls="category"
      >
        <div className="d-flex gap-2 align-items-center">
          <i className={`bi bi-list nav_icon`}></i>
          <span>Category</span>
        </div>
        <span>
          <i className="bi bi-chevron-left"></i>
        </span>
      </button>
      <div className="collapse" id="category">
        <CustomLink to="/category" icon="" name="Category" />
        <CustomLink to="/sub-category" icon="" name="Subcategory" />
        <CustomLink to="/inner-subcategory" icon="" name="Inner Subcategory" />
      </div>
    </>
  );
}
