import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("admin_token");
  return isAuthenticated ? children : <Navigate to="/admin/giris" />;
};

export default ProtectedRoute;
