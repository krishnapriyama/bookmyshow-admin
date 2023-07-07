import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import adminAxios from '../../../config/adminAxios'
//components
import Modaltheater from '../Models/edittheater'

const ViewTheaters = () => {
  const [length, SetLength] = useState()
  const [theaters, setTheaters] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5

  useEffect(() => {
    fetch('https://krishnapriya.online/admin/view-theaters')
      .then((response) => response.json())
      .then((data) => {
        SetLength(data.length)
        setTheaters(data)
      })
      .catch((error) => console.error(error))
  }, [])

  function authorizeTheater(theaterToUpdate, action) {
    adminAxios
      .patch(`/admin/accept`, {
        email: theaterToUpdate.email,
        action: action,
      })
      .then((response) => {
        const updatedTheaters = theaters.map((value) => {
          if (value.email === theaterToUpdate.email) {
            return { ...value, accepted: response.data.accepted }
          }
          return value
        })
        setTheaters(updatedTheaters)
      })
      .catch((error) => console.error(error))
  }
  function getCurrentPageData() {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return theaters.slice(startIndex, endIndex);
  }

  return (
    <div className="h-screen w-full p-0 m-0 flex justify-center items-center bg-gray-100 dark:bg-gray-800">
      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-sm bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Email
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Place
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {getCurrentPageData().map((theater, index) => (
              <tr
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
                key={theater.id}
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap"
                >
                  {theater.email}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap"
                >
                  {theater.name}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap"
                >
                  {theater.place}
                </td>
                <td className="px-6 py-4 items-center flex justify-center">
                  <button
                    type="button"
                    className={`text-white bg-blue-700 items-center rounded-lg text-sm px-5 py-2 mr-2 ${
                      theater.accepted ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    onClick={() => authorizeTheater(theater, !theater.accepted)}
                  >
                    {theater.accepted ? 'Accepted' : 'Rejected'}
                  </button>
                  <Modaltheater theater={theater}></Modaltheater>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
  pageCount={Math.ceil(theaters.length / itemsPerPage)}
  pageRangeDisplayed={5}
  marginPagesDisplayed={2}
  onPageChange={({ selected }) => setCurrentPage(selected)}
  containerClassName="flex justify-center my-5"
  activeClassName="font-medium bg-blue-700 text-white py-1 px-3"
  pageClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
  previousClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
  nextClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
  breakClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
  previousLabel="<<"
  nextLabel=">>"
/>
      </div>
    </div>
  )
}

export default ViewTheaters
