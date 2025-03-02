import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../Axios'
import {
  getTeamError,
  getTeamPending,
  getTeamSuccess
} from '../Toolkit/TeamSlicer'
import { FacebookLogo, InstagramLogo, TwitterLogo } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { ContextData } from '../Context/Context'

export const Team = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.team)
  const { setShowAlerterr, setShowConfirm, setDelete_, delete_, setIsErr } =
    useContext(ContextData)
  useEffect(() => {
    const getAllTeam = async () => {
      dispatch(getTeamPending())
      try {
        const response = await Axios.get('teams')
        dispatch(getTeamSuccess(response.data?.data || []))
      } catch (error) {
        setShowAlerterr(error.response?.data?.message || 'Unknown error')
        setIsErr(true)
      }
    }
    getAllTeam()
  }, [dispatch])
  const handleDelete = id => {
    setShowConfirm(true)
    setDelete_(['teams', `${id}`])
  }
  return (
    <div className='p-2 bg-pink-100 text-gray-900 min-h-screen h-screen pb-[100px] overflow-y-auto'>
      <div className='w-full flex flex-wrap gap-3 justify-between items-center p-3 border-b border-pink-300'>
        <h1 className='text-4xl font-bold text-pink-700'>Team</h1>
        <Link
          to={'/create-team'}
          className='bg-pink-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-pink-800 transition-all'
        >
          + Team
        </Link>
      </div>
      <br />
      {isPending ? (
        <div className='flex justify-center items-center mt-10'>
          <p className='text-xl text-pink-400 animate-pulse'>Loading...</p>
        </div>
      ) : isError ? (
        <p className='text-red-500 text-center text-xl mt-6'>
          Error: {isError}
        </p>
      ) : data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {data.map(team => (
            <div
              key={team._id}
              className='bg-white border border-pink-300 rounded-xl shadow-lg overflow-hidden relative text-center p-4 hover:scale-105 transition-transform duration-300'
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
                  <Link
                    to={`/team-edit/${team._id}`}
                    className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-400 transition-all'
                  >
                    Edit
                  </Link>
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
    </div>
  )
}
