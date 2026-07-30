import React from 'react'
import Navbar from '../../components/owner/Navbar'
import { Outlet } from 'react-router-dom'

function AdminNav() {
  return (
    <div className='flex min-h-screen'>
        <Navbar/>
        <main className='flex-1'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminNav