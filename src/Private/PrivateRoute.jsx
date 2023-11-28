import { Navigate, useLocation} from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "./loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;
  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
