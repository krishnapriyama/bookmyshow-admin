import React from 'react'
import { useFormik } from 'formik'
import adminAxios from '../../../config/adminAxios'

function languageandgenre() {
  const formikAddGenre = useFormik({
    initialValues: {
      genre: '',
    },
    validate: (values) => {
      const errors = {}
      if (!values.genre) {
        errors.genre = 'genre is required'
      }
      return errors
    },
    onSubmit: async (values) => {
      try {
        const response = await adminAxios.post('/admin/add-genre', {
          ...values,
        })
        if (response) {
          window.location.href = '/gener-language'
        }
      } catch (error) {
        console.log(error, 'Error from Axios')
      }
    },
  })

  const formikAddLanguage = useFormik({
    initialValues: {
      language: '',
    },
    validate: (values) => {
      const errors = {}
      if (!values.language) {
        errors.language = 'Language is required'
      }
      return errors
    },
    onSubmit: async (values) => {
      try {
        const response = await adminAxios.post('/admin/add-language', {
          ...values,
        })
        if (response) {
          window.location.href = '/gener-language'
        }
      } catch (error) {
        console.log(error, 'Error from Axios')
      }
    },
  })

  return (
    <div className="grid grid-cols-2 gap-96 mt-20 mx-auto ">
      <div>
        <form
          className="w-full max-w-lg"
          onSubmit={formikAddGenre.handleSubmit}
        >
          <h1 className="font-bold text-5xl items-center justify-center flex mb-11 text-white">
            ADD GENRE
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase
                         tracking-wide text-white text-xs font-bold mb-2"
                         htmlFor="grid-first-name"
              >
                genre
              </label>
              <input
                {...formikAddGenre.getFieldProps('genre')}
                className="appearance-none block w-full h-14 bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="genre"
                placeholder="Genre..."
              />

              {formikAddGenre.touched.genre && formikAddGenre.errors.genre ? (
                <div className="text-red-500">
                  {formikAddGenre.errors.genre}
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-full px-3 mt-9 items-end flex justify-end">
            <button className="text-white w-full h-14 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div>
        <form
          className="w-full max-w-lg"
          onSubmit={formikAddLanguage.handleSubmit}
        >
          <h1 className="font-bold text-5xl items-center justify-center flex mb-11 text-white">
            ADD LANGUAGE
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Language
              </label>
              <input
                {...formikAddLanguage.getFieldProps('language')}
                className="appearance-none block w-full h-14 bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="language"
                placeholder="Language..."
              />

              {formikAddLanguage.touched.language &&
              formikAddLanguage.errors.language ? (
                <div className="text-red-500">
                  {formikAddLanguage.errors.language}
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-full px-3 mt-9 items-end flex justify-end">
            <button className="text-white w-full h-14 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default languageandgenre
