import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AdminProctedRoute = ({ children }) => {
    const isAdmin = useSelector((state) => state.adminAuth.isAdmin)

    if (!isAdmin) {
        return <Navigate to={"/admin/login"} replace />
    }
    return children ?? <Outlet />
}

export const AdminPublicRoute = ({ children }) => {
    const isAdmin = useSelector((state) => state.adminAuth.isAdmin)

    if (isAdmin) {
        return <Navigate to={"/admin"} replace />
    }

    return children ?? <Outlet />
}