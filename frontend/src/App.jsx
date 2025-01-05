import {  Route, Routes, useNavigate } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import Login from "@/pages/users/Login"
import Register from "@/pages/users/Signup"

import Dashboard from '@/pages/admin/Dashboard'
import Navbar from '@/components/Navbar'
import AdminLogin from "@/pages/admin/Login"
import Profile from "@/pages/users/Profile"
import { Toaster } from '@/components/ui/toaster'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from './slice/user/userProfile'
import { ProtectedRoute, PublicRoute } from './components/routes/UserAuthRouter'
import { AdminProctedRoute, AdminPublicRoute } from './components/routes'


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector(state => state.adminAuth.isAdmin)

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch, isAdmin, navigate])

  return (
    <div >
      <Navbar />
      <Toaster />
      <Suspense>
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
