import { Route, Routes, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Login from "@/pages/users/Login"
import Register from "@/pages/users/Signup"


import { Toaster } from '@/components/ui/toaster'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from './slice/user/userProfile'
import { ProtectedRoute, PublicRoute } from './components/routes/UserAuthRouter'
import { AdminProctedRoute, AdminPublicRoute } from './components/routes'
import { Loader2 } from 'lucide-react'


const Dashboard = lazy(() => import("@/pages/admin/Dashboard"))
const Navbar = lazy(() => import("@/components/Navbar"))
const AdminLogin = lazy(() => import("@/pages/admin/Login"))
const Profile = lazy(() => import("@/pages/users/Profile"))

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector(state => state.adminAuth.isAdmin)

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch, isAdmin, navigate])

  return (
    <div >
      <Toaster />
      <Suspense fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
      }>
        <Navbar />
        <Routes>
          <Route element={<AdminPublicRoute />}>
            <Route path='/admin/login' element={<AdminLogin />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path='/user/login' element={<Login />} />
            <Route path='/user/register' element={<Register />} />
          </Route>
          <Route element={<AdminProctedRoute />}>
            <Route path='/admin' element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>

    </div>
  )
}

export default App



