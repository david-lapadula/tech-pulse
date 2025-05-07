import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};


export default PrivateRoute;
