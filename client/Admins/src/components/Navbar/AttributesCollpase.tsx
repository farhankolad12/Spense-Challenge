import { CustomLink } from "./SideBar";

export default function AttributesCollpase() {
  return (
    <>
      <button
        className="nav_link btn w-100 d-flex justify-content-between"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#attribute"
        aria-expanded="false"
        aria-controls="attribute"
      >
        <div className="d-flex gap-2 align-items-center">
          <i className={`bi bi-list nav_icon`}></i>
          <span>Attributes</span>
        </div>
        <span>
          <i className="bi bi-chevron-left"></i>
        </span>
      </button>
      <div className="collapse" id="attribute">
        <CustomLink to="/brand" icon="" name="Brand" />
        <CustomLink to="/attribute" icon="" name="Attribute" />
      </div>
    </>
  );
}
