import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Wait until auth check completes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-purple-700 font-semibold">Loading...</p>
      </div>
    );
  }

  // If not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
