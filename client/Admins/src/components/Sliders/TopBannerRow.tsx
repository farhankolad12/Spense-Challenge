import usePostReq from "../../hooks/usePostReq";
import ErrorCon from "../Message/ErrorCon";

export type Banner = {
  id: string;
  img: string;
  category: string;
  product: string;
  type: string;
};

export default function TopBannerRow({
  topBanner,
  setMakeReq,
  isLargeBanner,
}: {
  topBanner: Banner;
  setMakeReq: Function;
  isLargeBanner: boolean | undefined;
}) {
  const { error, execute, loading, setError } = usePostReq(
    `/home-settings/delete-${isLargeBanner ? "large" : "top"}-banner`
  );

  async function handleDelete() {
    try {
      const res = await execute({ id: topBanner.id });
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      setMakeReq(Math.floor(Math.random() * 9999));
    } catch {
      setError("Something went wrong!");
      return setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <tr>
        <td>{topBanner.id}</td>
        <td>
          <img
            src={
              import.meta.env.VITE_APP_API_URL +
              "/public/sliders/" +
              topBanner.img
            }
            alt="Banner"
            width="100%"
          />
        </td>
        <td>{topBanner.type}</td>
        <td>{!topBanner.category ? "--" : topBanner.category}</td>
        <td>{!topBanner.product ? "--" : topBanner.product}</td>
        <td>
          <button onClick={handleDelete} className="btn">
            {loading ? "loading..." : <i className="bi bi-trash" />}
          </button>
        </td>
      </tr>
    </>
  );
}
