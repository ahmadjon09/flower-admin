import { FacebookLogo, InstagramLogo, TwitterLogo } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { fetcher } from '../Middlewares/Fetcher'
import useSWR, { mutate } from 'swr'
import Axios from '../Axios'
import { useState } from 'react'

import { AddTeam } from '../modules/AddTeam'
import { IsOpenModal } from '../Components/css/Modal'
import { UpdateTeam } from '../modules/UpdateTeam'

export const Team = () => {
  const { data, error, isLoading } = useSWR('/teams', fetcher)
  const data_ = data?.data
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenE, setIsOpenE] = useState(false)
  const [id_, setId_] = useState('')

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this team?')) return
    try {
      await Axios.delete(`teams/${id}`)
      mutate('/teams')
      alert('Team deleted successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete team')
    }
  }
  const handleEdit = id => {
    setIsOpenE(true)
    setId_(id)
    IsOpenModal(true)
  }
  return (
    <div className={`p-2  text-gray-900 ${isOpen ? 'modalBody' : ''}`}>
      <div className='w-full flex flex-wrap gap-3 justify-between items-center p-3'>
        <h1 className='text-4xl font-bold text-pink-700'>Team</h1>
        <button
          onClick={() => {
            setIsOpen(true)
            IsOpenModal(true)
          }}
          className='bg-pink-700 text-white p-2 rounded-md shadow-lg hover:bg-pink-800 transition-all'
        >
          + Team
        </button>
      </div>
      <br />
      {isLoading ? (
        <div className='flex justify-center items-center mt-10'>
          <p className='text-xl text-pink-400 animate-pulse'>Loading...</p>
        </div>
      ) : error ? (
        <p className='text-red-500 text-center text-xl mt-6'>Error: {error}</p>
      ) : data_?.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {data_?.map(team => (
            <div
              key={team._id}
              className='bg-white border border-pink-300 rounded-xl shadow-lg overflow-hidden relative text-center p-4 '
            >
              <div className='w-full max-h-72 h-72 overflow-hidden rounded-md'>
                <img
                  src={team.photos[0] || 'https://via.placeholder.com/150'}
                  alt={`${team.name}`}
                  className='w-full h-full object-cover hover:opacity-80 transition-opacity duration-500'
                />
              </div>
              <div className='w-full p-4'>
                <h2 className='text-2xl font-bold text-pink-600'>
                  {team.name}
                </h2>
                <p className='text-sm text-gray-600 mt-2'>
                  {team.position.length > 150
                    ? team.position.slice(0, 150) + ' ...'
                    : team.position || 'Position'}
                </p>
                <div className='flex justify-center space-x-4 mt-4'>
                  <a
                    href={team.fsblink}
                    className='text-blue-500 hover:text-blue-300 transition-all'
                  >
                    <FacebookLogo size={32} />
                  </a>
                  <a
                    href={team.twtlink}
                    className='text-blue-400 hover:text-blue-200 transition-all'
                  >
                    <TwitterLogo size={32} />
                  </a>
                  <a
                    href={team.inslink}
                    className='text-red-500 hover:text-red-300 transition-all'
                  >
                    <InstagramLogo size={32} />
                  </a>
                </div>
                <div className='flex gap-3 flex-wrap justify-between items-center mt-6'>
                  <button
                    onClick={() => handleEdit(team._id)}
                    className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-400 transition-all'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(team._id)}
                    className='bg-red-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-red-400 transition-all'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-500 text-center text-lg mt-10'>
          No team members found.
        </p>
      )}
      {isOpen && <AddTeam isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isOpenE && (
        <UpdateTeam isOpen={isOpenE} setIsOpen={setIsOpenE} teamId={id_} />
      )}
    </div>
  )
}
