import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // const token = localStorage.getItem("token");
  const {token} = useSelector((state) => state.auth);
    // const { isAuthenticated } = useSelector((state) => state.auth);  // take token from here (redux slice)

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;