import React, { ReactNode, useContext, useEffect, useState } from "react";

type CurrentUser = {
  id: string;
  type: string;
  storeName: string | undefined;
  email: string;
  mobile: string;
  address: string;
  logo: File | string;
};

type Value = {
  currentUser: CurrentUser | undefined;
  authStateChange: Function;
};

const AuthContext = React.createContext<Value>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function authStateChange() {
    await fetch(import.meta.env.VITE_APP_API_URL + "/auth/check-auth-admin", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": import.meta.env.VITE_APP_API_URL,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        setCurrentUser(data.currentUser);
      })
      .catch(() => setCurrentUser(undefined))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    authStateChange();
  }, []);

  const value: Value = {
    currentUser,
    authStateChange,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
