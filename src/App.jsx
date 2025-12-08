import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ChallanExpertDashboard from "./components/ChallanExpertDashboard"     // ✅ renamed for clarity
import Login from "./pages/login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";
import Landing from "./pages/landing"; 
import { AuthProvider } from "./context/AuthProvider";
import DashboardLayout from "./layout/DashboardLayout";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                    {(selectedTab) => (
                       <ChallanExpertDashboard selectedTab={selectedTab} />
                   )}
                </DashboardLayout>   {/* ✅ this renders your full dashboard page */}
              </ProtectedRoute>
            }
          />

          {/* Default Route: Redirect unknown paths to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

