import Cookies from 'js-cookie'
//export const BASE_URL = 'http://localhost:8080'
 export const BASE_URL = 'https://flowers-server-ohej.onrender.com'
const token = Cookies.get('is_auth')
export const fetcher = url =>
  fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: token
    }
  }).then(res => res.json())
