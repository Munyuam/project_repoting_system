import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import DeptDashboard from '../components/DeptDashboard'

function Warehouse() {
  return (
    <div>
      <p>
        <Sidebar/>
        <Navbar/>
        <DeptDashboard/>
      </p>
    </div>
  )
}

export default Warehouse
