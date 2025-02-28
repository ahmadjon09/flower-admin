import axios from 'axios'
import Cookies from 'js-cookie'

const is_auth = Cookies.get('is_auth')

const instance = axios.create({
  baseURL: 'https://flowers-server-ohej.onrender.com/',
<<<<<<< HEAD
=======
  //baseURL: 'http://localhost:8080/',
>>>>>>> 2e5f448ef2ba9ec7cafc502a22f522c567b8979f
  headers: {
    Authorization: is_auth
  }
})

export default instance
