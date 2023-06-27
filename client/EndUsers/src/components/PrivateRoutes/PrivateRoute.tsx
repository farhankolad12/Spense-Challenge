import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ComponentProps } from "react";

export default function PrivateRoute({
  component,
}: {
  component: ComponentProps<any>;
}) {
  const { currentUser } = useAuth();

  return currentUser ? component : <Navigate to="/login" />;
}
