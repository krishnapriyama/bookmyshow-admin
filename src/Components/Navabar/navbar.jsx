import React from 'react';

function Navbar() {
  return ( 
    <nav className="bg-gray-800">
      <div className="px-4 py-2 max-w-full flex justify-between items-center">
        <div className="text-white font-bold text-3xl">ADMIN</div>
        <ul className="flex">
          <li className="mx-2">
            <a href="#" className="text-white hover:text-gray-300 text-xl">Home</a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-white hover:text-gray-300 text-xl">Dashboard</a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-white hover:text-gray-300 text-xl">Settings</a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-white hover:text-gray-300 text-xl">Help</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
