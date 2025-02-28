import axios from 'axios'
import Cookies from 'js-cookie'

const is_auth = Cookies.get('is_auth')

const instance = axios.create({
  baseURL: 'https://flowers-server-ohej.onrender.com/',
  //baseURL: 'http://localhost:8080/',
  headers: {
    Authorization: is_auth
  }
})

export default instance
