import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

interface ProtectedRouteProps {
  role?: "admin" | "user";
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()!;

  if (loading) return null; // wait until auth state is loaded

  if (!user) return <Navigate to="/login" replace />;

  // If role specified, redirect if user doesn't match
  if (role && user.role !== role) {
    // optional: redirect admins trying to access user pages
    if (role === "user" && user.role === "admin") return <Navigate to="/admindashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
