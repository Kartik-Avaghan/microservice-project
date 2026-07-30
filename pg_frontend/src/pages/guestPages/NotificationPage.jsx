import React from 'react'
import GuestNavbar from '../../components/guest/GuestNavbar'
import Notification from '../../components/guest/Notification'

function NotificationPage() {
  return (
    <div className=' flex'>
        <GuestNavbar/>
        <div className='flex-1 overflow-y-auto'><Notification/></div>
    </div>
  )
}

export default NotificationPage