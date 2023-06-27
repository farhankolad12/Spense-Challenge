import { useState } from "react";
import { Link } from "react-router-dom";
import usePostReq from "../../hooks/usePostReq";
import ErrorCon from "../Message/ErrorCon";
import SuccessCon from "../Message/SuccessCon";

export type Sliders = {
  id: string;
  img: string;
  link: string;
};

export default function SliderRow({
  slider,
  setMakeReq,
}: {
  slider: Sliders;
  setMakeReq: Function;
}) {
  const [success, setSuccess] = useState("");

  const { error, execute, loading, setError } = usePostReq(
    "/home-settings/delete-slider"
  );

  async function handleDelete() {
    try {
      const res = await execute({ id: slider.id });
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      setMakeReq(Math.floor(Math.random() * 9999));
      setSuccess("Deleted!");
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <tr className="border">
        <td>{slider.id}</td>
        <td>
          <img
            src={
              import.meta.env.VITE_APP_API_URL + "/public/sliders/" + slider.img
            }
            alt="Slider"
            width="50%"
          />
        </td>
        <td>
          <Link to={slider.link}>Link</Link>
        </td>
        <td>
          <button disabled={loading} onClick={handleDelete} className="btn">
            {loading ? "loading.." : <i className="bi bi-trash text-danger" />}
          </button>
        </td>
      </tr>
    </>
  );
}
