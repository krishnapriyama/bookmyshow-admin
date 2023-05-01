import React from 'react'

//components
import Sidebar from '../../Components/Sidebar/sidebar'
import Addusers from '../../Components/Forms/addusers'
import Navbar from '../../Components/Navabar/navbar'

const addUser = () => {
  return (
    <div className="mx-auto w-full h-screen dark:bg-gray-800  ">
      <Addusers />
    </div>
  )
}

export default addUser
