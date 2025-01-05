import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


export const ProtectedRoute = ({ children }) => {
  const isLogged = useSelector((state) => state.userProfile.isLogged)

  if (!isLogged) {
    return <Navigate to={"/user/login"} replace />
  }

  return children ?? <Outlet />
}

export const PublicRoute = ({ children }) => {
  const isLogged = useSelector((state) => state.userProfile.isLogged)

  if (isLogged) {
    return <Navigate to={"/"} replace />
  }

  return children ?? <Outlet />
}