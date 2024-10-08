import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user && !localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
