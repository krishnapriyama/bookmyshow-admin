import React from 'react'

//components
import Viewmovies from '../../Components/Tables/viewmovies'
import Sidebar from '../../Components/Sidebar/sidebar'
import Navbar from '../../Components/Navabar/navbar'

const viewmovies = () => {
  return ( 
      <div className="mx-auto w-full h-screen dark:bg-gray-800">
        <Viewmovies />
      </div>
  )
}

export default viewmovies
