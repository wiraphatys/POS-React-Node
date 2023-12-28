import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Template() {
  return (
    <div>
        <div className="wrapper">
            <Navbar />
            <Sidebar />
        </div>
    </div>
  )
}

export default Template