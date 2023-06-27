import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";
import Product from "../Home/Product";
import { Wishlist } from "./Wishlist";

export default function WishlistRow({ list }: { list: Wishlist }) {
  const {
    error,
    loading,
    userData: product,
  } = useGetReq("/products/get-product-id", { id: list.productId });
  return (
    <>
      <ErrorCon error={error} />
      {!loading ? product ? <Product product={product} /> : "" : "loading..."}
    </>
  );
}
