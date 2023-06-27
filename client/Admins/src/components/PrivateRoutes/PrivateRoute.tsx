import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { ReactNode } from "react";

export default function PrivateRoutes({ component }: { component: ReactNode }) {
  const { currentUser } = useAuth();

  return currentUser ? component : <Navigate to="/login" />;
}
