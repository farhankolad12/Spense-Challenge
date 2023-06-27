import { ComponentProps } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function VendorComponent({
  component,
}: {
  component: ComponentProps<any>;
}) {
  const { currentUser } = useAuth();

  return currentUser && currentUser.type === "vendor" ? (
    component
  ) : (
    <Navigate to="/" />
  );
}
