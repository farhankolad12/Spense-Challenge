import { CustomLink } from "./SideBar";

export default function HomePageSettings() {
  return (
    <>
      <button
        className="nav_link btn w-100 d-flex justify-content-between"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#home-setting"
        aria-expanded="false"
        aria-controls="home-setting"
      >
        <div className="d-flex gap-2 align-items-center">
          <i className={`bi bi-list nav_icon`}></i>
          <span>Home Page Settings</span>
        </div>
        <span>
          <i className="bi bi-chevron-left"></i>
        </span>
      </button>
      <div className="collapse" id="home-setting">
        <CustomLink to="/sliders" icon="" name="Sliders" />
        <CustomLink to="/top-banner" icon="" name="Top Banner" />
        <CustomLink to="/large-banner" icon="" name="Large Banner" />
      </div>
    </>
  );
}
