import { useState, useEffect } from "react";

export default function useGetReq(url: string, params: any) {
  const [userData, setUserData] = useState<any>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setUserData(undefined);
      await fetch(
        import.meta.env.VITE_APP_API_URL +
          url +
          "?" +
          new URLSearchParams(params),
        {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": import.meta.env.VITE_APP_API_URL,
          },
        }
      )
        .then(async (res) => {
          const data = await res.json();
          setUserData(data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    })();
  }, [
    params.email,
    params.makeReq,
    params.id,
    params.subCategoryId,
    params.categoryId,
    params.page,
  ]);

  return { error, loading, userData };
}
