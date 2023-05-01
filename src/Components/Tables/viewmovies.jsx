import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import adminAxios from '../../../config/adminAxios'

//component
import Editmovie from '../Models/editmovie'

const viewmovies = () => {
  const [length, setLength] = useState()
  const [allMovies, setAllMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    adminAxios.get('/admin/view-movies').then((response) => {
      setLength(response.data.length)
      setAllMovies(response.data)
    })
  }, [length, allMovies])

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/admin/deleteMovie/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          const updatedMovies = allMovies.filter((movie) => movie._id !== id)
          setAllMovies(updatedMovies)
        } else {
          console.error('Error deleting user')
          alert('Error deleting user')
        }
      })
      .catch((error) => {
        console.error(error)
        alert('Error deleting user')
      })
  }

  function getCurrentPageData() {
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return allMovies.slice(startIndex, endIndex)
  }

  return (
    <>
      <div className="w-full p-0 m-0 flex justify-center items-center">
        <div className="relative overflow-x-auto shadow-md">
          {length > 0 ? (
            <table className="w-full text-sm bg-white mt-9 dark:bg-gray-900 rounded-2xl overflow-hidden">
              <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium text-lg">
                    Movie name
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-lg">
                    language
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-lg">
                    release date
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-lg">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-lg">
                    genre
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {getCurrentPageData().map((movie) => (
                  <tr
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    key={movie._id}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap text-lg"
                    >
                      {movie.moviename}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap text-lg"
                    >
                      {movie.language}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap text-lg"
                    >
                      {movie.releasedate.split('T')[0]}
                    </td>
                    <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white  whitespace-nowrap"
                >
                  <img
                    height={10}
                    width={20}
                    src={movie.poster1}
                    alt=""
                  />
                </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap text-lg"
                    >
                      {movie.genre}
                    </td>

                    <td className="px-6 py-4 items-center flex justify-center gap-4">
                      <Editmovie movie={movie}></Editmovie>
                      <button
                        type="button"
                        onClick={() => handleDelete(movie._id)}
                        className="text-white bg-red-600 font-medium rounded-lg text-lg px-5 py-2.5 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Link to="/add-movies">
              <button
                type="button"
                className="text-white  bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none items-center "
              >
                ADD Movies
              </button>
            </Link>
          )}
          <ReactPaginate
            pageCount={Math.ceil(allMovies.length / itemsPerPage)}
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
    </>
  )
}

export default viewmovies
