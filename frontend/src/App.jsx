import { Route, Routes } from 'react-router-dom'
import {  Suspense } from 'react'
import Login from "@/pages/users/Login"
import Register from "@/pages/users/Signup"

import Dashboard from '@/pages/admin/Dashboard'
import Navbar from '@/components/Navbar'
import AdminLogin from "@/pages/admin/Login"

function App() {

  return (
    <div >
        <Navbar/>
        <Suspense>
            <Routes>
                  <Route path='/' element={<>Hello world</>} />
                  <Route path='/user/login' element={<Login />}  />
                   <Route path='/user/register' element={<Register/>} />
                  <Route path='/admin' element={<Dashboard/>}  />
                  <Route path='/admin/login' element={<AdminLogin />} />
                  <Route path='/admin/logout'  />
                  <Route path='/admin/create'  />
                  <Route path='/admin/update/:id'  /> 
                  {/* <Route path='/admin/delete/:id'  />  */} 
            </Routes>
        </Suspense>
    </div>
  )
}

export default App
