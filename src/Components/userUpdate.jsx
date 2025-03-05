import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../Axios'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSuccess } from '../Toolkit/UserSlicer'

export const UserUpdate = (id, showUp, setShowUp) => {
  const id_ = id.id
  const navigate = useNavigate()
  const [imagePending, setImagePending] = useState(false)
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.user)
  const [userData, setUserData] = useState({
    newPassword: ''
  })

  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsPending(true)
        const { data } = (await Axios.get(`admin/${id_}`)).data
        for (const key in data) {
          setUserData(prev => ({ ...prev, [key]: data[key] }))
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsPending(false)
      }
    }
    getUser()
  }, [id])
  const handleFileChange = async e => {
    try {
      const formImageData = new FormData()
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        formImageData.append('images', files[i])
      }
      setImagePending(true)
      const { data } = await Axios.post('/upload', formImageData)
      setUserData(prevData => ({
        ...prevData,
        avatar: data.images
      }))
    } catch (error) {
      alert(error)
    } finally {
      setImagePending(false)
    }
  }
  const handleInputChange = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await Axios.put(`admin/${id_}`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar,
        phoneNumber: userData.phoneNumber,
        password: userData.newPassword
      })
      dispatch(getUserSuccess(data))
      // navigate('/admin')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='fixed z-[999] top-0 left-0 flex justify-end items-center min-h-screen w-full h-full'>
      <form
        onSubmit={handleSubmit}
        className='w-full h-full max-w-md md:max-w-lg bg-white p-6 md:p-8 shadow-2xl border border-pink-300'
      >
        <h1 className='text-center text-2xl font-bold text-pink-600 mb-4'>
          Update User
        </h1>
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
        <input
          type='file'
          name='avatar'
          onChange={handleFileChange}
          multiple
          className='p-3 outline-none border-2 border-pink-400 rounded-2xl w-full mb-3 focus:border-pink-600 transition'
        />
        <div className='grid grid-cols-2 gap-3'>
          <Link
            to='/admin'
            className='bg-gray-400 rounded-2xl flex justify-center text-white py-3 font-bold hover:bg-gray-500 transition'
          >
            Cancel
          </Link>
          <button
            type='submit'
            disabled={imagePending}
            className={
              imagePending
                ? 'bg-pink-400 cursor-not-allowed'
                : `bg-pink-500 rounded-2xl text-white py-3 font-bold hover:bg-pink-600 transition`
            }
          >
            {imagePending ? 'Loading...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
