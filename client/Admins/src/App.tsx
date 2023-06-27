import { Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SideBar from "./components/Navbar/SideBar";
import AdminComponent from "./components/PrivateRoutes/AdminComponent";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import InnerSubCategoryPage from "./pages/InnerSubCategoryPage";
import BrandPage from "./pages/BrandPage";
import VendorComponent from "./components/PrivateRoutes/VendorComponent";
import CategoryAddPage from "./pages/CategoryAddPage";
import CategoryEditPage from "./pages/CategoryEditPage";
import SubCategoryAddPage from "./pages/SubCategoryAddPage";
import SubCategoryEditPage from "./pages/SubCategoryEditPage";
import InnerSubCategoryAddPage from "./pages/InnerSubCategoryAddPage";
import BrandAddPage from "./pages/BrandAddPage";
import BrandEditPage from "./pages/BrandEditPage";
import AttributePage from "./pages/AttributePage";
import AttributeAddPage from "./pages/AttributeAddPage";
import VednorProducts from "./pages/VednorProducts";
import ProductsAdd from "./pages/ProductsAdd";
import ProductEdit from "./pages/ProductEdit";
import Coupons from "./pages/Coupons";
import VendorSettings from "./pages/VendorSettings";
import CouponsAdd from "./pages/CouponsAdd";
import CouponsEdit from "./pages/CouponsEdit";
import VendorOrders from "./pages/VendorOrders";
import Sliders from "./pages/Sliders";
import VendorOrderDetail from "./pages/VendorOrderDetail";
import SliderAdd from "./pages/SliderAdd";
import TopBanner from "./pages/TopBanner";
import TopBannerAdd from "./pages/TopBannerAdd";
import LargeBanner from "./pages/LargeBanner";
import LargeBannerAdd from "./pages/LargeBannerAdd";
import Vendors from "./pages/Vendors";
import VendorDetail from "./pages/VendorDetail";
import Customers from "./pages/Customers";
import Subscribers from "./pages/Subscribers";
import CMSPages from "./pages/CMSPages";

function App() {
  return (
    <>
      <PrivateRoutes component={<SideBar />} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoutes component={<Home />} />} />
        <Route
          path="/category"
          element={<AdminComponent component={<CategoryPage />} />}
        />
        <Route
          path="/coupons/add"
          element={
            <AdminComponent component={<CouponsAdd coupon={undefined} />} />
          }
        />
        <Route
          path="/coupons/edit/:id"
          element={<AdminComponent component={<CouponsEdit />} />}
        />
        <Route
          path="/inner-subcategory/add"
          element={<AdminComponent component={<InnerSubCategoryAddPage />} />}
        />
        <Route
          path="/category/add"
          element={<AdminComponent component={<CategoryAddPage />} />}
        />
        <Route
          path="/subcategory/add"
          element={<AdminComponent component={<SubCategoryAddPage />} />}
        />
        <Route
          path="/category/edit/:id"
          element={<AdminComponent component={<CategoryEditPage />} />}
        />
        <Route
          path="/subcategory/edit/:subcategoryId/:categoryId"
          element={<AdminComponent component={<SubCategoryEditPage />} />}
        />
        <Route
          path="/sub-category"
          element={<AdminComponent component={<SubCategoryPage />} />}
        />
        <Route
          path="/inner-subcategory"
          element={<AdminComponent component={<InnerSubCategoryPage />} />}
        />
        <Route
          path="/brand"
          element={<AdminComponent component={<BrandPage />} />}
        />
        <Route
          path="/brand/add"
          element={<AdminComponent component={<BrandAddPage />} />}
        />
        <Route
          path="/brand/edit/:id"
          element={<AdminComponent component={<BrandEditPage />} />}
        />
        <Route
          path="/attribute"
          element={<AdminComponent component={<AttributePage />} />}
        />
        <Route
          path="/attribute/add"
          element={<AdminComponent component={<AttributeAddPage />} />}
        />
        <Route
          path="/sliders"
          element={<AdminComponent component={<Sliders />} />}
        />
        <Route
          path="/slider/add"
          element={<AdminComponent component={<SliderAdd />} />}
        />
        <Route
          path="/top-banner"
          element={<AdminComponent component={<TopBanner />} />}
        />
        <Route
          path="/top-banner/add"
          element={<AdminComponent component={<TopBannerAdd />} />}
        />
        <Route
          path="/large-banner"
          element={<AdminComponent component={<LargeBanner />} />}
        />
        <Route
          path="/large-banner/add"
          element={<AdminComponent component={<LargeBannerAdd />} />}
        />
        <Route
          path="/vendors"
          element={<AdminComponent component={<Vendors />} />}
        />
        <Route
          path="/vendor-detail/:id"
          element={<AdminComponent component={<VendorDetail />} />}
        />
        <Route
          path="/customers"
          element={<AdminComponent component={<Customers />} />}
        />
        <Route
          path="/coupons"
          element={<AdminComponent component={<Coupons />} />}
        />
        <Route
          path="/subscribers"
          element={<AdminComponent component={<Subscribers />} />}
        />
        <Route
          path="/about"
          element={<AdminComponent component={<CMSPages page="About" />} />}
        />
        <Route
          path="/privacy-policy"
          element={
            <AdminComponent component={<CMSPages page="Privacy Policy" />} />
          }
        />
        <Route
          path="/terms-conditions"
          element={
            <AdminComponent component={<CMSPages page="Terms conditions" />} />
          }
        />
        <Route
          path="/products"
          element={<VendorComponent component={<VednorProducts />} />}
        />
        <Route
          path="/products/add"
          element={
            <VendorComponent component={<ProductsAdd product={undefined} />} />
          }
        />
        <Route
          path="/products/edit/:id"
          element={<VendorComponent component={<ProductEdit />} />}
        />
        <Route
          path="/orders"
          element={<VendorComponent component={<VendorOrders />} />}
        />
        <Route
          path="/order-detail/:id"
          element={<VendorComponent component={<VendorOrderDetail />} />}
        />
        <Route
          path="/settings"
          element={<VendorComponent component={<VendorSettings />} />}
        />
      </Routes>
    </>
  );
}

export default App;
