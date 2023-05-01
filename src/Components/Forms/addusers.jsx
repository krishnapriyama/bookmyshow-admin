import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import adminAxios from '../../../config/adminAxios'

const addusers = () => {
  const navigate = useNavigate()

  const generateError = (error) =>
    toast.error(error, {
      position: 'bottom-right',
    })

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
      const error = {}
      if (!values.email) {
        error.email = 'Email Required'
      }else

      if (!values.name) {
        error.name = 'Name Required'
      }else

      if (!values.phone) {
        error.phone = 'Number Required'
      } else if (values.phone.length != 10) {
        error.phone = 'Number should be 10'
      } else if (!/^[0-9]+$/.test(values.phone)) {
        error.phone = 'This field should only contain numbers'
      }else

      if (!values.password) {
        error.password = 'Password Required'
      }else if (values.password != values.confirmPassword) {
        error.confirmPassword = 'Password Mismatch'
      }
      return error
    },
    onSubmit: async (values) => {
      try {
        const response = await adminAxios.post(
          '/register',
          { ...values },
          
        )

        if (response.data.created == true) {
          navigate('/view-users')
          console.log('Registeration Sucess')
        } else if (response.data.errors) {
          const { email, password } = response.data.errors
          if (email) {
            generateError(email)
          }
          console.log(response)
          console.log('Registeration Failed')
        }
      } catch (error) {
        console.log(error, 'Error from ClientAxios')
      }
    },
  })

  return (
    <div className="flex justify-center items-center w-full text-white">
      <form className="w-full max-w-lg mt-9" onSubmit={formik.handleSubmit}>
        <h1 className="font-bold text-5xl items-center justify-center flex mb-11">
          ADD USER
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              hrmlFor="grid-first-name"
            >
              Email
            </label>
            <input
              {...formik.getFieldProps('email')}
              className="appearance-none block w-full h-14 bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="email"
              name="email"
              placeholder="Email..."
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              hrmlFor="grid-last-name"
            >
              UserName
            </label>
            <input
              {...formik.getFieldProps('name')}
              className="appearance-none block w-full h-14 bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="name"
              type="text"
              name="name"
              placeholder="Username..."
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              hrmlFor="grid-password"
            >
              Phone Number
            </label>
            <input
              {...formik.getFieldProps('phone')}
              className="appearance-none block w-full h-14 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="phone"
              type="text"
              name="phone"
              placeholder="Number..."
            />
          </div>
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              hrmlFor="grid-password"
            >
              password
            </label>
            <input
              {...formik.getFieldProps('password')}
              className="appearance-none block w-full h-14 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              name="password"
              placeholder="Password..."
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              hrmlFor="grid-password"
            >
              confrom password
            </label>
            <input
              {...formik.getFieldProps('confirmPassword')}
              className="appearance-none block w-full h-14 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password..."
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full px-3 mt-9 items-end flex justify-end">
          <button className="text-white w-full h-14 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Submit
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  )
}

export default addusers
