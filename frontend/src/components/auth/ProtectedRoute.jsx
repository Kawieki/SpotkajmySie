import { useAuth } from "../../context/AuthContext.jsx";
import { Navigate, useParams } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage.jsx";
import { USER_ROLES } from "../../config.js";

const ProtectedRoute = ({
  roles = [],
  selfCheck = false,
  children,
  canOrganizerAccess = false,
}) => {
  const { user, loading } = useAuth();
  const { id: paramId } = useParams();

  if (loading) return <LoadingPage />;
  if (!user) return <Navigate to="/login" />;

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (selfCheck && user.role !== USER_ROLES.ADMIN && user.id !== paramId) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (
    canOrganizerAccess &&
    user.role === USER_ROLES.USER &&
    user.id !== paramId
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
