import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import adminAxios from '../../../config/adminAxios'
import { storage } from '../../Firebase/firebase'
import { useState } from 'react'

const addmovieform = () => {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [genre, setGenre] = useState([])
  const [language, setLanguage] = useState([])
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      moviename: '',
      releasedate: '',
      description: '',
      genre: '',
      language: '',
      trailerlink: '',
    },
    validate: (values) => {
      const errors = {}
      if (!values.moviename) {
        errors.moviename = 'Name Required'
      } else if (!values.releasedate) {
        errors.releasedate = 'Date Required'
      } else if (!values.description) {
        errors.description = 'Description Required'
      } else if (!values.trailerlink) {
        errors.trailerlink = 'Link Required'
      } else if (!values.genre) {
        errors.genre = 'Genre Required'
      } else if (!values.language) {
        errors.language = 'Language Required'
      }
      return errors
    },
    onSubmit: async (values) => {
      try {
        let posterUrl1 = null
        let posterUrl2 = null
        let posterUrl3 = null

        // Save image1 to path/to/image1 folder
        if (image1) {
          const uploadTask1 = storage
            .ref(`path/to/image1/${image1?.name}`)
            .put(image1)
          await uploadTask1
          posterUrl1 = await storage
            .ref('path/to/image1')
            .child(image1.name)
            .getDownloadURL()
          console.log(posterUrl1, 'Uploaded image1 URL')
        } else {
          console.log('Image1 is null or undefined')
        }

        // Save image2 to path/to/image2 folder
        if (image2) {
          const uploadTask2 = storage
            .ref(`path/to/image2/${image2?.name}`)
            .put(image2)
          await uploadTask2
          posterUrl2 = await storage
            .ref('path/to/image2')
            .child(image2.name)
            .getDownloadURL()
          console.log(posterUrl2, 'Uploaded image2 URL')
        } else {
          console.log('Image2 is null or undefined')
        }

        // Save image3 to path/to/image3 folder
        if (image3) {
          const uploadTask3 = storage
            .ref(`path/to/image3/${image3?.name}`)
            .put(image3)
          await uploadTask3
          posterUrl3 = await storage
            .ref('path/to/image3')
            .child(image3.name)
            .getDownloadURL()
          console.log(posterUrl3, 'Uploaded image3 URL')
        } else {
          console.log('Image3 is null or undefined')
        }

        const response = await adminAxios.post(
          '/admin/addmovies',
          {
            ...values,
            poster1: posterUrl1,
            poster2: posterUrl2,
            poster3: posterUrl3,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )

        if (response.data.msg) {
          navigate('/view-movies')
        } else {
          console.log('Something went wrong')
        }
      } catch (error) {
        console.log(error, 'Error from ClientAxios')
      }
    },
  })

  const handleposter1Change = (field, e) => {
    if (e.target.files[0]) {
      setImage1(e.target.files[0])
    }
  }
  const handleposter2Change = (field, e) => {
    if (e.target.files[0]) {
      setImage2(e.target.files[0])
    }
  }
  const handleposter3Change = (field, e) => {
    if (e.target.files[0]) {
      setImage3(e.target.files[0])
    }
  }

  useEffect(() => {
    try {
      adminAxios.get('/admin/all-Genres').then((response) => {
        setGenre(response.data)
      })
      adminAxios.get('/admin/all-Languages').then((response) => {
        setLanguage(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [genre, language])

  return (
    <div className="flex justify-center items-center w-full text-white">
      <form
        className="w-full max-w-lg ml-4 mt-9"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="font-bold text-5xl items-center justify-center flex mb-11">
          ADD MOVIE
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-bleck text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Movie Name
            </label>
            <input
              {...formik.getFieldProps('moviename')}
              className="appearance-none block w-full h-14 bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              name="moviename"
              placeholder="THE DARK"
            />
            {formik.touched.moviename && formik.errors.moviename ? (
              <div className="text-red-500">{formik.errors.moviename}</div>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Release date
            </label>
            <input
              {...formik.getFieldProps('releasedate')}
              className="appearance-none block w-full h-14 bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-last-name"
              type="date"
              name="releasedate"
              placeholder="date"
            />
            {formik.touched.releasedate && formik.errors.releasedate ? (
              <div className="text-red-500">{formik.errors.releasedate}</div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Description
            </label>
            <input
              {...formik.getFieldProps('description')}
              className="appearance-none block w-full h-14 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              name="description"
              placeholder="Description............"
            />
          </div>
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500">{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Movie poster
            </label>
            <input
              className="appearance-none block w-full h-14 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              name="poster1"
              type="file"
              onChange={(e) => handleposter1Change('poster1', e)}
            />
            {formik.touched.poster1 && formik.errors.poster1 ? (
              <div className="text-red-500">{formik.errors.poster1}</div>
            ) : null}
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              side poster
            </label>
            <input
              className="appearance-none block w-full h-14 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              name="poster2"
              type="file"
              onChange={(e) => handleposter2Change('poster2', e)}
            />
            {formik.touched.poster2 && formik.errors.poster2 ? (
              <div className="text-red-500">{formik.errors.poster2}</div>
            ) : null}
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              grand poster
            </label>
            <input
              className="appearance-none block w-full h-14 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="file"
              name="poster3"
              onChange={(e) => handleposter3Change('poster3', e)}
            />
          </div>
          {formik.touched.poster3 && formik.errors.poster3 ? (
            <div className="text-red-500">{formik.errors.poster3}</div>
          ) : null}
        </div>

        <div className="flex flex-wrap -mx-3 mb-2 mt-9">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Genre
            </label>
            <select
              {...formik.getFieldProps('genre')}
              className="appearance-none block w-full h-14 bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-city"
              name="genre"
            >
              <option value="">Select</option>
              {genre.map((g) => (
                <option key={g.id} value={g.genre}>
                  {g.genre}
                </option>
              ))}
            </select>
            {formik.touched.genre && formik.errors.genre ? (
              <div className="text-red-500">{formik.errors.genre}</div>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              language
            </label>
            <select
              {...formik.getFieldProps('language')}
              className="appearance-none block w-full h-14 bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-state"
              name="language"
            >
              <option value="">Select</option>
              {language.map((l) => (
                <option key={l.id} value={l.language}>
                  {l.language}
                </option>
              ))}
            </select>
            {formik.touched.language && formik.errors.language ? (
              <div className="text-red-500">{formik.errors.language}</div>
            ) : null}
          </div>
        </div>

        <div className="w-full mt-9">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Trailer link
          </label>
          <input
            {...formik.getFieldProps('trailerlink')}
            className="appearance-none block w-full h-14 bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-password"
            type="text"
            name="trailerlink"
            placeholder="Link"
          />
          {formik.touched.trailerlink && formik.errors.trailerlink ? (
            <div className="text-red-500">{formik.errors.trailerlink}</div>
          ) : null}
        </div>
        <div className="w-full px-3 mt-9 items-end flex justify-end">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 h-14 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default addmovieform
