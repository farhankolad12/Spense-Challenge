import { CustomLink } from "./SideBar";

export default function CMSPagesCollapse() {
  return (
    <>
      <button
        className="nav_link btn w-100 d-flex justify-content-between"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#cms-pages"
        aria-expanded="false"
        aria-controls="cms-pages"
      >
        <div className="d-flex gap-2 align-items-center">
          <i className={`bi bi-list nav_icon`}></i>
          <span>CMS Pages</span>
        </div>
        <span>
          <i className="bi bi-chevron-left"></i>
        </span>
      </button>
      <div className="collapse" id="cms-pages">
        <CustomLink to="/about" icon="" name="About" />
        <CustomLink to="/privacy-policy" icon="" name="Privacy policy" />
        <CustomLink to="/terms-conditions" icon="" name="Terms Conditions" />
      </div>
    </>
  );
}
