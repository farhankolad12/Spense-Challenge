import { useState } from "react";

export default function usePostReq(url: string) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function execute(payload: any) {
    setLoading(true);
    // const isFormData = formdata.get("profileImg");

    return await fetch(import.meta.env.VITE_APP_API_URL + url, {
      body:
        payload.get && payload.get("profileImg")
          ? payload
          : JSON.stringify(payload),
      credentials: "include",
      method: "POST",
      headers:
        payload.get && payload.get("profileImg")
          ? {
              "Access-Control-Allow-Origin": import.meta.env.VITE_APP_API_URL,
            }
          : {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": import.meta.env.VITE_APP_API_URL,
            },
    })
      .then((res) => res.json())
      .catch((err) => {
        setError(err.message);
        setTimeout(() => setError(""), 4000);
      })
      .finally(() => setLoading(false));
  }

  return { error, loading, execute, setError };
}
