import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import GetProjects from './uicomponents/GetProjects'

function DisplayProjects() {
  return (
    <>
    <div className='bg-gray-50'>
      <Navbar/>
      <Sidebar/>
      <GetProjects/>   
    </div>   
    </>
  )
}

export default DisplayProjects