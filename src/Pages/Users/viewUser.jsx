import React from 'react'

//components
import Viewusers from '../../Components/Tables/viewusers'
import Sidebar from '../../Components/Sidebar/sidebar'
import Navbar from '../../Components/Navabar/navbar'

const viewUser = () => {
  return (
      <div className="mx-auto w-full h-screen dark:bg-gray-800">
        <Viewusers />
      </div>
  )
}

export default viewUser
