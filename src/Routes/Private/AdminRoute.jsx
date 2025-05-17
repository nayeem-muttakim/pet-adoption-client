import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "./Loader";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) return <Loader />;
  if (user && isAdmin) return children;
  return <Navigate to="/login" state={{ from: location }} replace />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
