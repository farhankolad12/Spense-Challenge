import { ComponentProps } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function AdminComponent({
  component,
}: {
  component: ComponentProps<any>;
}) {
  const { currentUser } = useAuth();

  return currentUser && currentUser.type === "admin" ? (
    component
  ) : (
    <Navigate to="/" />
  );
}
