import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './Components/css/Scrollbar.css'
import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './Toolkit/UserSlicer.jsx'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    user: UserReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div className='container'>
      <App />
    </div>
  </Provider>
)
