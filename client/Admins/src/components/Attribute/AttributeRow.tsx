import { useState } from "react";
import { AttributeType } from "../../pages/AttributePage";
import ErrorCon from "../Message/ErrorCon";
import SuccessCon from "../Message/SuccessCon";
import usePostReq from "../../hooks/usePostReq";

export default function AttributeRow({
  attribute,
  setMakeReq,
}: {
  attribute: AttributeType;
  setMakeReq: Function;
}) {
  const [success, setSuccess] = useState("");

  const { error, execute, loading, setError } = usePostReq(
    "/attributes/delete-attribute"
  );

  async function handleDelete() {
    try {
      const res = await execute({ id: attribute.id });
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      setSuccess("Deleted!");
      setTimeout(() => setSuccess(""), 4000);
      setMakeReq(Math.floor(Math.random() * 777777));
    } catch {
      setError("Something went wrong!");
      return setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <tr key={attribute.id}>
        <td className="border-end">
          <span>{attribute.id}</span>
        </td>
        <td className="border-end">
          <span>{attribute.name}</span>
        </td>
        <td className="border-end">
          <button disabled={loading} className="btn" onClick={handleDelete}>
            {loading ? (
              "loading..."
            ) : (
              <i className="bi bi-trash fs-5 text-danger" />
            )}
          </button>
        </td>
      </tr>
    </>
  );
}
