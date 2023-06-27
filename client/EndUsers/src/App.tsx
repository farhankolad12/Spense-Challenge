import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Header from "./components/Home/Header";
import SubscribeNewsletter from "./components/Home/SubscribeNewsletter";
import Footer from "./components/Home/Footer";
import SubCategory from "./components/Categories/SubCategory";
import Category from "./components/Categories/Category";
import InnerSubCategory from "./components/Categories/InnerSubCategory";
import NewProducts from "./pages/NewProducts";
import HotProducts from "./pages/HotProducts";
import FeatureProducts from "./pages/FeatureProducts";
import ProductPage from "./pages/ProductPage";
import BrandPage from "./components/Brand/BrandPage";
import Brands from "./pages/Brands";
import Vendors from "./pages/Vendors";
import VendorPage from "./pages/VendorPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VendorSignUp from "./pages/VendorSignUp";
import VerifyOtp from "./components/Auth/VerifyOtp";
import Account from "./pages/Account";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import OrderAccount from "./components/Account/OrderAccount";
import Wishlist from "./components/Account/Wishlist";
import Notifications from "./components/Account/Notifications";
import Address from "./components/Account/Address";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderDetail from "./components/Account/OrderDetail";
import TrackOrder from "./pages/TrackOrder";
import CMSPage from "./pages/CMSPage";
import Wallet from "./components/Account/Wallet";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/brand/:name" element={<BrandPage />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendor/:id" element={<VendorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp-verify" element={<VerifyOtp />} />
        <Route path="/vendor-signup" element={<VendorSignUp />} />
        <Route path="/about-us" element={<CMSPage page="About" />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<Category />} />
        <Route
          path="/categories/:category/:subcategory"
          element={<SubCategory />}
        />
        <Route
          path="/categories/:category/:subcategory/:innersubcategory"
          element={<InnerSubCategory />}
        />
        <Route path="/new-products" element={<NewProducts />} />
        <Route path="/feature-products" element={<FeatureProducts />} />
        <Route path="/hot-products" element={<HotProducts />} />
        <Route
          path="/privacy-policy"
          element={<CMSPage page="Privacy Policy" />}
        />
        <Route
          path="/terms-conditions"
          element={<CMSPage page="Terms Conditions" />}
        />
        <Route
          path="/account"
          element={<PrivateRoute component={<Account />} />}
        />
        <Route
          path="/wallet"
          element={<PrivateRoute component={<Wallet />} />}
        />
        <Route
          path="/orders"
          element={<PrivateRoute component={<OrderAccount />} />}
        />
        <Route
          path="/order-detail/:id"
          element={<PrivateRoute component={<OrderDetail />} />}
        />
        <Route
          path="/track-order/:id"
          element={<PrivateRoute component={<TrackOrder />} />}
        />
        <Route
          path="/checkout"
          element={<PrivateRoute component={<Checkout />} />}
        />
        <Route
          path="/wishlist"
          element={<PrivateRoute component={<Wishlist />} />}
        />
        <Route path="/cart" element={<PrivateRoute component={<Cart />} />} />
        <Route
          path="/address"
          element={<PrivateRoute component={<Address />} />}
        />
        <Route
          path="/notifications"
          element={<PrivateRoute component={<Notifications />} />}
        />
      </Routes>
      <SubscribeNewsletter />
      <Footer />
    </>
  );
}

export default App;
