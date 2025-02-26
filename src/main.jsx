import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './Toolkit/UserSlicer.jsx'
import { Provider } from 'react-redux'
import AdminsReducer from './Toolkit/AdminsSlicer.jsx'
import ProductsReducer from './Toolkit/ProductsSlicer.jsx'
import TeamReducer from './Toolkit/TeamSlicer.jsx'
import CarouselReducer from './Toolkit/CarouselSlicer.jsx'
import { Context } from './Context/Context.jsx'

const store = configureStore({
  reducer: {
    user: UserReducer,
    admins: AdminsReducer,
    products: ProductsReducer,
    team: TeamReducer,
    carousel: CarouselReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context>
    <Provider store={store}>
      <div className='container'>
        <App />
      </div>
    </Provider>
  </Context>
)
