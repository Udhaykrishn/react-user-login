import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import Login from "@/pages/users/Login"
import Register from "@/pages/users/Signup"

import Dashboard from '@/pages/admin/Dashboard'
import Navbar from '@/components/Navbar'
import AdminLogin from "@/pages/admin/Login"
import Profile from "@/pages/users/Profile"
import { Toaster } from '@/components/ui/toaster'


function App() {

  return (
    <div >
      <Navbar />
      <Toaster/>
      <Suspense>
        <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/register' element={<Register />} />
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/login' element={<AdminLogin />} />
        </Routes>
      </Suspense>
     
    </div>
  )
}

export default App
