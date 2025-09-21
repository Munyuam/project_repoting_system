import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import GetUserManagement from './uicomponents/GetUserManagement'

function UserManagement() {
  return (
    <>
        <Sidebar/>
        <Navbar/>
        <GetUserManagement/>
    </>
  )
}

export default UserManagement