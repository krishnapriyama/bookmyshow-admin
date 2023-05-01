import React, { useState } from 'react'
import adminAxios from '../../../config/adminAxios'

import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export default function Modaltheater(props) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [theater, setTheater] = useState(props.theater)

  const formik = useFormik({
    initialValues: {
      theatername: theater.name,
      email:theater.email,
      place: theater.place,
    },
    validate: (values) => {
      const errors = {}
      if (!values.theatername) {
        errors.theatername = 'Name Required'
      }
      if (!values.place) {
        errors.place = 'Place Required'
      }
      return errors
    },
    onSubmit: async (values) => {
      setShowModal(false)
      try {
         values._id = theater._id
         const response = await adminAxios.post(
            '/admin/updateTheater',
            { ...values }
            )
            if (response.data.msg) {
               window.location.href = '/view-theaters'
        } else {
          console.log('Something went wrong')
        }
      } catch (error) {
        console.log(error, 'Error from ClientAxios')
      }
    },
  })

  return (
    <>
      <button
        className="text-black bg-blue-600 font-medium items-center rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-7 rounded-xl">
            <div className="relative">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center p-5 mt-7 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">EDIT USER</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className="w-full max-w-lg" onSubmit={formik.handleSubmit}>
                  <div className="relative p-6 flex-auto">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          theaer Name
                        </label>
                        <input
                          {...formik.getFieldProps('theatername')}
                          className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          name="theatername"
                          placeholder="Theater Name"
                        />
                        {formik.touched.theatername &&
                        formik.errors.theatername ? (
                          <div className="text-red-500">
                            {formik.errors.theatername}
                          </div>
                        ) : null}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Place
                        </label>
                        <input
                          {...formik.getFieldProps('place')}
                          className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 round
           ed py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          name="place"
                          placeholder="Place"
                        />
                        {formik.touched.place && formik.errors.place ? (
                          <div className="text-red-500">
                            {formik.errors.place}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end  p-6 border-solid border-slate-200">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
