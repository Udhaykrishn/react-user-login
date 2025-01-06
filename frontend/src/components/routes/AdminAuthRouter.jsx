import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AdminProtectedRoute = ({ children }) => {
    const { isAdmin, isInitialized, pending } = useSelector((state) => state.adminAuth);
    
    // Show loading or splash screen while checking auth
    if (!isInitialized || pending) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }
    
    return children ?? <Outlet />;
};

export const AdminPublicRoute = ({ children }) => {
    const { isAdmin, isInitialized, pending } = useSelector((state) => state.adminAuth);
    
    if (!isInitialized || pending) {
        return <div>Loading...</div>;
    }

    if (isAdmin) {
        return <Navigate to="/admin" replace />;
    }

    return children ?? <Outlet />;
};