import React, { ComponentProps, useState, useContext, useEffect } from "react";

const AuthProvider = React.createContext<Value>(null!);

export function useAuth() {
  return useContext(AuthProvider);
}

type CurrentUser = {
  id: string;
  email: string;
  fullName: string;
  isVerified: false;
  mobile: string;
  profileImg: string | File;
};

type Value = {
  currentUser: CurrentUser | undefined;
  authStateChange: Function;
};

export default function AuthContext({
  children,
}: {
  children: ComponentProps<any>;
}) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // const { setMakeReq } = useApp();

  async function authStateChange() {
    await fetch(import.meta.env.VITE_APP_API_URL + "/auth/check-auth", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": import.meta.env.VITE_APP_API_URL,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        // setMakeReq(Math.floor(Math.random() * 99));
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
    <AuthProvider.Provider value={value}>
      {!loading && children}
    </AuthProvider.Provider>
  );
}
