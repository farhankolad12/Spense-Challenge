import { Link } from "react-router-dom";
import useGetReq from "../../hooks/useGetReq";
import WishlistRow from "./WishlistRow";
import ErrorCon from "../Auth/ErrorCon";

export type Wishlist = {
  id: string;
  createdAt: number;
  productId: string;
  uid: string;
};

export default function Wishlist() {
  const {
    error,
    loading,
    userData: wishlists,
  } = useGetReq("/products/get-wishlist", {});

  return (
    <>
      <ErrorCon error={error} />
      <div>
        <div className="bg-white py-2">
          <div className="container">
            <div className="d-flex gap-2 align-items-center">
              <Link to="/">
                <i className="bi bi-house fs-5" />
              </Link>
              <span>/</span>
              <span>Wishlist</span>
            </div>
          </div>
        </div>
        <div className="container-fluid products-lists my-4">
          {!loading ? (
            wishlists && wishlists.length > 0 ? (
              wishlists.map((list: Wishlist) => {
                return <WishlistRow list={list} key={list.id} />;
              })
            ) : (
              <h3 className="text-center my-3">Nothing in wishlists</h3>
            )
          ) : (
            "loading"
          )}
        </div>
      </div>
    </>
  );
}
