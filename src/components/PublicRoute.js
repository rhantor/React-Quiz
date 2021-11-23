import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute() {
  const { currentUser } = useAuth();

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
}