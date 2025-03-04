import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import useSWR, { mutate } from 'swr'
import { fetcher } from '../Middlewares/Fetcher'
import Axios from '../Axios'
import { useState } from 'react'
import { UserUpdate } from '../Components/userUpdate'

export const Admins = () => {
  const { data, isLoading } = useSWR('/admin', fetcher)
  const [showUp, setShowUp] = useState(false)
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return
    try {
      await Axios.delete(`admin/${id}`)
      mutate(
        '/admin',
        data.data.filter(admin => admin._id !== id),
        true
      )
      alert('Admin deleted successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete admin')
    }
  }

  return (
    <div className='p-6'>
      <div className='w-full flex-wrap gap-3 flex justify-between items-center p-4'>
        <h1 className='text-3xl text-pink-700 font-bold'>Admins</h1>
        <Link
          to={'/create-admin'}
          className='bg-pink-700 text-white px-4 py-2 rounded-full shadow hover:bg-pink-800 transition-all'
        >
          + Admin
        </Link>
      </div>
      <br />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : data?.data?.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {data?.data.map(admin => (
            <div
              key={admin._id}
              className='bg-white relative shadow-lg rounded-xl p-4 flex flex-col items-center text-center hover:shadow-2xl'
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
              <p className='text-gray-600'>+(998) {admin.phoneNumber}</p>
              <div className='flex gap-3 mt-4'>
                <button
                  // to={`/edit-admin/${admin._id}`}
                  onClick={() => setShowUp(true)}
                  className='bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-all'
                >
                  <Pencil size={16} />
                </button>
                {data?.data.length > 1 ? (
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
