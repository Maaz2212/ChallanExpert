import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // While user state is still being resolved (initial load), show nothing or loader
  if (user === undefined) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname + location.search}`} replace />;
  }
  console.log("ProtectedRoute user value:", user);
  console.log("Redirect target:", `/login?redirect=${location.pathname + location.search}`);

  return children;
}


