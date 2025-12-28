import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!token || admin?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
