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
import { AddNewAdmin } from './modules/AddNewAdmin'
import { EditProduct } from './modules/EditProduct'
import { AuthLayout } from './Layout/AuthLayout'
import { Login } from './Pages/Login'
import { RootLayout } from './Layout/RootLayout'
import { Products } from './Pages/Products'
import { AddProduct } from './modules/AddProduct'
import { Team } from './Pages/Team'
import { Error } from './Pages/Error'
import { Admins } from './Pages/Admins'
import { UserUpdate } from './modules/UserUpdate'
import { AddMap } from './modules/AddMap'
import { ViewMap } from './Pages/MapView'
import { UpdateTeam } from './modules/UpdateTeam'
import { AddNewCarousel } from './modules/AddCarousel'

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
            { path: 'edit-admin/:id', element: <UserUpdate /> },
            { path: 'create-admin', element: <AddNewAdmin /> },
            { path: 'product', element: <Products /> },
            { path: 'products/edit/:id', element: <EditProduct /> },
            { path: 'create-product', element: <AddProduct /> },
            { path: 'teams', element: <Team /> },
            { path: 'team-edit/:id', element: <UpdateTeam /> },
            { path: 'add-maps', element: <AddMap /> },
            { path: 'map', element: <ViewMap /> },
            { path: '+carousel', element: <AddNewCarousel /> },
            { path: '*', element: <Error /> }
          ]
        }
      : {
          path: '/',
          element: <AuthLayout />,
          children: [
            { index: true, element: <Login /> },
            { path: '*', element: <Error /> }
          ]
        }
  ])

  return <RouterProvider router={router} />
}

export default App
