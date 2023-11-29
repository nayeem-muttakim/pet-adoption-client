import { Navigate, useLocation} from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "./loader";
import useAdmin from "../Hooks/useAdmin";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin,isAdminLoading]=useAdmin()
  const location = useLocation();

  if (loading || isAdminLoading) return <Loader />;
  if (user && isAdmin) return children;
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
