import HomeCarousel from "../components/Home/HomeCarousel";
import TopBanner from "../components/Home/TopBanner";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import HotProducts from "../components/Home/HotProducts";
import LargeBanner from "../components/Home/LargeBanner";
import TopBrands from "../components/Home/TopBrands";
import Vendors from "../components/Home/Vendors";

export default function Home() {
  return (
    <>
      <HomeCarousel />
      <TopBanner />
      <FeaturedProducts />
      <HotProducts />
      <LargeBanner />
      <TopBrands />
      <Vendors />
    </>
  );
}
