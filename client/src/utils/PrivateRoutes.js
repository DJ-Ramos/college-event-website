import { Navigate, Outlet } from "react-router-dom";
import getCookie from "../hooks/getCookie"

const PrivateRoutes = () => {
  return getCookie('first_name') != undefined ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
