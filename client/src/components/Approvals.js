import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import GetPending from './uicomponents/getPending'

function Approvals() {
  return (
    <>
        <Navbar/>
        <Sidebar/>
        <GetPending/>
    </>
  )
}

export default Approvals