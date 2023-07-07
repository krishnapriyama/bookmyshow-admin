import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import swal from 'sweetalert';
import adminAxios from '../../../config/adminAxios'

//components
import Modelgenre  from '../Models/editgenre'
import Modellanguage  from '../Models/editlanguage'

const viewgenre_language = () => {
   const [genrelength, Setgenrelength] = useState()
   const [languagelength, Setlanguagelength] = useState()
   const [genre, setGenre] = useState([]);
   const [language, setLanguage] = useState([]);



   useEffect(() => {
      adminAxios.get('/admin/all-Genres').then((response) => {
         Setgenrelength(response.data.length)
         setGenre(response.data)
      })
      adminAxios.get('/admin/all-Languages').then((response) => {
         Setlanguagelength(response.data.length)
         setLanguage(response.data)
      })
   }, [])



   const genrehandleDelete = (id) => {
      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this user!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
      })
         .then((willDelete) => {
            if (willDelete) {
               fetch(`https://krishnapriya.online/admin/deletegenre/${id}`, {
                  method: 'DELETE',
                  headers: {
                     'Content-Type': 'application/json',
                  },
               })
                  .then((response) => {
                     if (response.ok) {
                        const updatedgenre = genre.filter((g) => g._id !== id);
                        setGenre(updatedgenre);
                     } else {
                        console.error('Error deleting genre')
                        alert('Error deleting genre')
                     }
                  })
                  .catch((error) => {
                     console.error(error)
                     alert('Error deleting genre')
                  })
            }
         });
   }
   const languagehandleDelete = (id) => {
      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this user!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
      })
         .then((willDelete) => {
            if (willDelete) {
               fetch(`https://krishnapriya.online/admin/deletelanguage/${id}`, {
                  method: 'DELETE',
                  headers: {
                     'Content-Type': 'application/json',
                  },
               })
                  .then((response) => {
                     if (response.ok) {
                        const updatedlanguage = language.filter((l) => l._id !== id);
                        setLanguage(updatedlanguage);
                     } else {
                        console.error('Error deleting language')
                        alert('Error deleting language')
                     }
                  })
                  .catch((error) => {
                     console.error(error)
                     alert('Error deleting language')
                  })
            }
         });
   }

   return (

      <>
         <div className="grid grid-cols-2 gap-5 mx-auto">
            <div className="w-full p-6 flex justify-center">
               <div className="relative overflow-x-auto shadow-md">
                  {genrelength > 0 ? (
                     <table className="w-full text-sm bg-white mt-9 dark:bg-gray-900 rounded-2xl overflow-hidden">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300">
                           <tr>
                              <th scope="col" className="px-6 py-3 font-medium text-lg">
                                 Genre
                              </th>
                              <th scope="col" className="px-6 py-3 font-medium text-lg">
                                 Action
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                           {genre.map((g) => (
                              <tr
                                 className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                 key={g._id}
                              >
                                 <td
                                    sc000ope="row"
                                    className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap text-lg"
                                 >
                                    {g.genre}
                                 </td>
                                 <td className="px-6 py-4 flex justify-center items-center space-x-4">
                                    <button
                                       type="button"
                                       onClick={() => genrehandleDelete(g._id)}
                                       className="text-white bg-red-600 font-medium rounded-lg text-lg px-5 py-2.5 focus:outline-none"
                                    >
                                       Delete
                                    </button>
                                    <Modelgenre genre={g}></Modelgenre>
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
                           ADD GENRE
                        </button>
                     </Link>
                  )}
               </div>
            </div>
            <div className="w-full p-6  justify-center">
               <div className="relative overflow-x-auto shadow-md">
                  {languagelength > 0 ? (
                     <table className="w-full text-sm bg-white dark:bg-gray-900 mt-9 rounded-2xl overflow-hidden">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300">
                           <tr>
                              <th scope="col" className="px-6 py-3 font-medium text-lg">
                                 Email
                              </th>
                              <th scope="col" className="px-6 py-3 font-medium text-lg">
                                 Action
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                           {language.map((l) => (
                              <tr
                                 className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                 key={l._id}
                              >
                                 <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap text-lg"
                                 >
                                    {l.language}
                                 </td>
                                 <td className="px-6 py-4 flex justify-center items-center space-x-4">
                                    <button
                                       type="button"
                                       onClick={() => languagehandleDelete(l._id)}
                                       className="text-white bg-red-600 font-medium rounded-lg text-lg px-5 py-2.5 focus:outline-none"
                                    >
                                       Delete
                                    </button>
                                    <Modellanguage language={l}></Modellanguage>
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
               </div>
            </div>
         </div>
      </>
   )
}

export default viewgenre_language
