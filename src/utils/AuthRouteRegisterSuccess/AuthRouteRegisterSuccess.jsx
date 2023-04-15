import { useAuth } from "../../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRouteRegisterSuccess = () => {
  const { registerSuccess } = useAuth();
  const location = useLocation();

  return registerSuccess ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRouteRegisterSuccess;
