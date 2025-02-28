import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Axios from '../Axios'
import { ContextData } from '../Context/Context'

export const UserUpdate = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [userData, setUserData] = useState({
    newPassword: ''
  })
  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState('')
  const { setShowAlertInfo, setShowAlerterr } = useContext(ContextData)
  useEffect(() => {
    const getUser = async () => {
      try {
        setIsPending(true)
        const { data } = (await Axios.get(`admin/${id}`)).data
        for (const key in data) {
          setUserData(prev => ({ ...prev, [key]: data[key] }))
        }
      } catch (error) {
        setIsError(error.response?.data?.message || 'An error occurred.')
      } finally {
        setIsPending(false)
      }
    }
    getUser()
  }, [id])

  const handleInputChange = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await Axios.put(`admin/${id}`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar,
        phoneNumber: userData.phoneNumber,
        password: userData.newPassword
      })
      navigate('/admins')
      setShowAlertInfo('Admin updated successfully ')
      setShowAlerterr(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-pink-100 px-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md md:max-w-lg bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-pink-300'
      >
        <h1 className='text-center text-2xl font-bold text-pink-600 mb-4'>
          Update Admin
        </h1>
        {isError && (
          <p className='text-center text-red-500 text-sm mb-3'>{isError}</p>
        )}
        <input
          className='p-3 outline-none border-2 border-pink-400 rounded-2xl w-full mb-3 focus:border-pink-600 transition'
          type='text'
          placeholder='Firstname'
          name='firstName'
          value={userData.firstName || ''}
          onChange={handleInputChange}
        />
        <input
          className='p-3 outline-none border-2 border-pink-400 rounded-2xl w-full mb-3 focus:border-pink-600 transition'
          type='text'
          placeholder='Lastname'
          name='lastName'
          value={userData.lastName || ''}
          onChange={handleInputChange}
        />
        <input
          className='p-3 outline-none border-2 border-pink-400 rounded-2xl w-full mb-3 focus:border-pink-600 transition'
          type='number'
          placeholder='Phone number'
          name='phoneNumber'
          value={userData.phoneNumber || ''}
          onChange={handleInputChange}
        />
        <input
          className='p-3 outline-none border-2 border-pink-400 rounded-2xl w-full mb-3 focus:border-pink-600 transition'
          type='password'
          placeholder='New password'
          name='newPassword'
          value={userData.newPassword || ''}
          onChange={handleInputChange}
        />
        <div className='grid grid-cols-2 gap-3'>
          <Link
            to='/admins'
            className='bg-gray-400 rounded-2xl flex justify-center text-white py-3 font-bold hover:bg-gray-500 transition'
          >
            Cancel
          </Link>
          <button
            type='submit'
            className='bg-pink-500 rounded-2xl text-white py-3 font-bold hover:bg-pink-600 transition'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
