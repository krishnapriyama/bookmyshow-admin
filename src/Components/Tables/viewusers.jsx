import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import swal from 'sweetalert';
import adminAxios from '../../../config/adminAxios'

//components
import Modaluser from '../Models/edituser'

const viewusers = () => {
  const [length, SetLength] = useState()
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5
const[editedvalue,seteditedvalue] = useState()

  useEffect(() => {
    adminAxios.get('/admin/view-users').then((response) => {
      SetLength(response.data.length)
      setAllUsers(response.data)
    })
  }, [])

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:4000/admin/deleteUser/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              const updatedUsers = allUsers.filter((user) => user._id !== id);
              setAllUsers(updatedUsers);
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
    });
  }

  function userAction(usertoUpdate, action) {
    adminAxios
      .post(`/admin/useraction`, {
        email: usertoUpdate.email,
        action: action,
      })
      .then((response) => {
        console.log(response)
        const updatedUsers = allUsers.map((t) => {
          if (t.email === usertoUpdate.email) {
            return { ...t, isBlocked: response.data.isBlocked }
          }
          return t
        })
        setAllUsers(updatedUsers)
      })
      .catch((error) => console.error(error))
  }

  function getCurrentPageData() {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allUsers.slice(startIndex, endIndex);
  }

  return (
    
    <>
      <div className="w-full p-6 flex items-center justify-center">
        <div className="relative overflow-x-auto shadow-md">
          {length > 0 ? (
            <table className="w-full text-sm mt-9 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
              <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium text-lg">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-lg">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {getCurrentPageData().map((user) => (
                  <tr
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    key={user._id}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap text-lg"
                    >
                      {user.email}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap text-lg"
                    >
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 flex justify-center items-center space-x-4">
                      <button
                        type="button"
                        className={`text-white bg-blue-700 font-medium rounded-lg text-lg px-5 py-2.5 ${
                          user.isBlocked ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        onClick={() => userAction(user, !user.isBlocked)}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user._id)}
                        className="text-white bg-red-600 font-medium rounded-lg text-lg px-5 py-2.5 focus:outline-none"
                      >
                        Delete
                      </button>
                      <Modaluser user={user}></Modaluser>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Link to="/add-users">
              <button
                type="button"
                className="text-white  bg-red-600 font-medium rounded-lg text-lg px-5 py-2.5 focus:outline-none"
              >
                ADD USERS
              </button>
            </Link>
          )}
        <ReactPaginate
  pageCount={Math.ceil(allUsers.length / itemsPerPage)}
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

export default viewusers
