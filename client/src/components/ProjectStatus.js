import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import GetProjectStatus from './uicomponents/GetProjectStatus'

function ProjectStatus() {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <GetProjectStatus/>
    </>
  )
}

export default ProjectStatus