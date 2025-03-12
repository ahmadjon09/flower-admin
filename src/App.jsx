import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Axios from './Axios'
import Cookies from 'js-cookie'
import {
  getUserError,
  getUserPending,
  getUserSuccess
} from './Toolkit/UserSlicer'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from './Pages/Loading'
import { Dashboard } from './Pages/Dashboard'
import { AuthLayout } from './Layout/AuthLayout'
import { Login } from './Pages/Login'
import { RootLayout } from './Layout/RootLayout'
import { Products } from './Pages/Products'
import { Team } from './Pages/Team'
import { Error } from './Pages/Error'
import { Admins } from './Pages/Admins'
import { ViewMap } from './Pages/MapView'
import { Post } from './Pages/Posts'

function App () {
  const { isAuth, isPending } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getMyData = async () => {
      try {
        dispatch(getUserPending())
        const response = await Axios.get('admin/me')

        if (response.data) {
          dispatch(getUserSuccess(response.data))
        } else {
          dispatch(getUserError('No user data available'))
        }
      } catch (error) {
        dispatch(getUserError(error.response?.data || 'Unknown Token'))
      } finally {
        setIsLoading(false)
      }
    }

    getMyData()
  }, [dispatch])

  if (isLoading || isPending) {
    return <Loading />
  }

  const router = createBrowserRouter([
    isAuth
      ? {
          path: '/',
          element: <RootLayout />,
          children: [
            { index: true, element: <Dashboard /> },
            { path: 'admin', element: <Admins /> },
            { path: 'product', element: <Products /> },
            { path: 'teams', element: <Team /> },
            { path: 'map', element: <ViewMap /> },
            { path: 'post', element: <Post /> },
            { path: '*', element: <Error /> }
          ]
        }
      : {
          path: '/',
          element: <AuthLayout />,
          children: [
            { index: true, element: <Login /> },
            { path: '*', element: <Login /> }
          ]
        }
  ])

  return <RouterProvider router={router} />
}

export default App
