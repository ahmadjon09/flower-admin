import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../Axios'
import {
  getAdminsError,
  getAdminsPending,
  getAdminsSuccess
} from '../Toolkit/AdminsSlicer'
import { Pencil, Trash2 } from 'lucide-react'

export const Admins = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, isPending, isError } = useSelector(state => state.admins)

  useEffect(() => {
    const getAllAdmins = async () => {
      dispatch(getAdminsPending())
      try {
        const response = await Axios.get('admin')
        dispatch(getAdminsSuccess(response.data?.data || []))
      } catch (error) {
        dispatch(
          getAdminsError(error.response?.data?.message || 'Unknown error')
        )
      }
    }
    getAllAdmins()
  }, [dispatch])

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return
    try {
      await Axios.delete(`admin/${id}`)
      dispatch(getAdminsSuccess(data.filter(admin => admin._id !== id)))
      alert('Admin deleted successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete admin')
    }
  }

  return (
    <div className='p-6 bg-gradient-to-b from-pink-100 to-white min-h-screen h-screen pb-[100px] overflow-y-auto'>
      <div className='w-full border-b border-pink-300 flex-wrap gap-3 flex justify-between items-center p-4'>
        <h1 className='text-3xl text-pink-700 font-bold'>Admins</h1>
        <Link
          to={'/create-admin'}
          className='bg-pink-700 text-white px-4 py-2 rounded-full shadow hover:bg-pink-800 transition-all'
        >
          + Admin
        </Link>
      </div>
      <br />
      {isPending ? (
        <p className='text-center text-pink-700'>Loading...</p>
      ) : isError ? (
        <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
      ) : data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {data.map(admin => (
            <div
              key={admin._id}
              className='bg-white shadow-lg rounded-xl hover:scale-110 duration-200 p-4 flex flex-col items-center text-center transition-all hover:shadow-2xl'
            >
              <img
                src={
                  admin.avatar ||
                  'https://st3.depositphotos.com/5852012/15878/v/450/depositphotos_158781058-stock-illustration-photo-gallery-flat-icon-with.jpg'
                }
                alt='Avatar'
                className='w-20 h-20 rounded-full object-cover mb-3'
              />
              <h3 className='text-lg font-semibold text-pink-800'>
                {admin.firstName} {admin.lastName}
              </h3>
              <p className='text-gray-600'>{admin.phoneNumber}</p>
              <div className='flex gap-3 mt-4'>
                <Link
                  to={`/edit-admin/${admin._id}`}
                  className='bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-all'
                >
                  <Pencil size={16} />
                </Link>
                {data.length > 1 ? (
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className='bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all'
                  >
                    <Trash2 size={16} />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-600 text-center text-lg mt-4'>
          No admins found.
        </p>
      )}
    </div>
  )
}
