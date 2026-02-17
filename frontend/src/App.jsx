import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SOSProvider } from "./context/SOSContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import SOSDashboard from "./pages/SOS/SOSDashboard";

function App() {
  return (
    <AuthProvider>
      <SOSProvider>
        <Router>
          <Routes>
            {/* ---------- Public Routes ---------- */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* ---------- Protected Routes ---------- */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sos"
              element={
                <ProtectedRoute>
                  <SOSDashboard />
                </ProtectedRoute>
              }
            />

            {/* ---------- Fallback ---------- */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </SOSProvider>
    </AuthProvider>
  );
}

export default App;
