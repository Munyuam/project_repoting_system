import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import GetAssignedProjects from './uicomponents/GetAssignedProjects'

function AssignedProjects() {
  return (
   <>
    <Navbar/>
    <Sidebar/>
    <GetAssignedProjects/>
   </>
  )
}

export default AssignedProjects