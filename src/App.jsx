import React, { lazy, Suspense } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Lazy load components
const Dashboard = lazy(() => import('./Pages/Dashboard/dashboard'))
const Login = lazy(() => import('./Pages/Authentication/login'))
const Sidebar = lazy(() => import('./Pages/Dashboard/sidebar'))
const AddMovies = lazy(() => import('./Pages/Movies/addmovies'))
const Viewmovies = lazy(() => import('./Pages/Movies/viewmovies'))
const AddUser = lazy(() => import('./Pages/Users/addUser'))
const Viewusers = lazy(() => import('./Pages/Users/viewUser'))
const Addtheater = lazy(() => import('./Pages/Theaters/addtheater'))
const Viewtheater = lazy(() => import('./Pages/Theaters/viewtheater'))
const Genre_Language = lazy(() => import('./Pages/Gener&Language/add'))
const Viewgenre_Language = lazy(() => import('./Pages/Gener&Language/view'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/login'}
          element={
            <Suspense fallback={<div className="bg-gray-800">Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        {/* child component */}
        <Route
          path={'/'}
          element={
            <Suspense fallback={<div className="bg-gray-800">Loading...</div>}>
              <Sidebar />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense
                fallback={<div className="bg-gray-800">Loading...</div>}
              >
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path={'/add-movies'}
            element={
              <Suspense
                fallback={<div className="bg-gray-800">Loading...</div>}
              >
                <AddMovies />
              </Suspense>
            }
          />
          <Route
            path={'/view-movies'}
            element={
              <Suspense
                fallback={<div className="bg-gray-800">Loading...</div>}
              >
                <Viewmovies />
              </Suspense>
            }
          />
          <Route
            path={'/add-users'}
            element={
              <Suspense
                fallback={<div className="bg-gray-800">Loading...</div>}
              >
                <AddUser />
              </Suspense>
            }
          />
          <Route
            path={'/view-users'}
            element={
              <Suspense
                fallback={<div className="bg-gray-800">Loading...</div>}
              >
                <Viewusers />
              </Suspense>
            }
          />
          <Route
            path={'/add-theaters'}
            element={
              <Suspense
                fallback={<div className="bg-gray-800">Loading...</div>}
              >
                <Addtheater />
              </Suspense>
            }
          />
          <Route
            path={'/view-theaters'}
            element={
              <Suspense
                fallback={<div className="bg-gray-800">Loading...</div>}
              >
                <Viewtheater />
              </Suspense>
            }
          />
        <Route
          path={'/gener-language'}
          element={
            <Suspense
              fallback={<div className="bg-gray-800">Loading...</div>}
            >
              <Genre_Language />
            </Suspense>
          }
        />
        <Route
          path={'/view-genre_language'}
          element={
            <Suspense
              fallback={<div className="bg-gray-800">Loading...</div>}
            >
              <Viewgenre_Language />
            </Suspense>
          }
        />
        </Route>
      {/* end */}
    </Routes>
    </BrowserRouter >
  )
}

export default App
