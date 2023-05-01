import React from 'react'

// components
import Sidebar from '../../Components/Sidebar/sidebar'
import Addmovieform from '../../Components/Forms/addmovie'
import Navbar from '../../Components/Navabar/navbar'

const addmovies = () => {
  return (
      <div className="mx-auto w-full h-screen dark:bg-gray-800">
        <Addmovieform />
      </div>
  )
}

export default addmovies
