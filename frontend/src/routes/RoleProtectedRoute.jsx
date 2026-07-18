import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/common/Loader";

const RoleProtectedRoute = ({ roles = [] }) => {
    const { loading, user } = useAuth();
    const allowedRoles = roles.map((role) => role.toLowerCase());
    const userRole = user?.role?.toLowerCase();

    if (loading) {
        return <Loader />;
    }

    if (allowedRoles.length && !allowedRoles.includes(userRole)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default RoleProtectedRoute;
