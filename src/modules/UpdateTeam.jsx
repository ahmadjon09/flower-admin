import React, { useContext, useEffect, useState } from 'react'
import Axios from '../Axios'
import { useNavigate, useParams } from 'react-router-dom'
import { ContextData } from '../Context/Context'

export const UpdateTeam = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setShowAlertInfo, setShowAlerterr, setIsErr } =
    useContext(ContextData)

  const [teamData, setTeamData] = useState({
    name: '',
    position: '',
    fsblink: '',
    twtlink: '',
    inslink: '',
    photos: []
  })

  const [isPending, setIsPending] = useState(false)
  const [imagePending, setImagePending] = useState(false)

  useEffect(() => {
    const getTeam = async () => {
      try {
        setIsPending(true)
        const { data } = await Axios.get(`/teams/${id}`)
        setTeamData(data.OneTeam)
      } catch (error) {
        setShowAlertInfo(error.response?.data?.message || 'An error occurred.')
        setIsErr(true)
      } finally {
        setIsPending(false)
        setIsErr(false)
      }
    }
    getTeam()
  }, [id])

  const handleInputChange = e => {
    const { name, value } = e.target
    setTeamData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = async e => {
    try {
      const formImageData = new FormData()
      const files = Array.from(e.target.files)
      files.forEach(file => {
        formImageData.append('photos', file)
      })
      setImagePending(true)
      const { data } = await Axios.post('/upload', formImageData)
      setTeamData(prevData => ({
        ...prevData,
        photos: [...data.photos]
      }))
    } catch (error) {
      setShowAlerterr(true)
      setIsErr(true)
      setShowAlertInfo(error.response?.data?.message)
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    try {
      await Axios.put(`teams/${id}`, teamData)
      navigate('/team')
      setShowAlertInfo('Team updated successfully ')
      setShowAlerterr(true)
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred.')
    }
  }

  return (
    <div className='min-h-screen h-screen overflow-y-auto pb-[100px] flex flex-col items-center bg-gradient-to-br from-pink-100 to-pink-200 p-6'>
      <h1 className='text-5xl font-bold text-pink-700 mb-6'>Edit Team</h1>
      {isPending && <p className='text-blue-500'>Loading...</p>}
      <form
        onSubmit={handleFormSubmit}
        className='bg-white shadow-lg rounded-xl p-6 w-full max-w-lg flex flex-col space-y-4 border border-pink-300'
      >
        <input
          type='text'
          name='name'
          className='border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-500'
          onChange={handleInputChange}
          required
          value={teamData?.name || ''}
          placeholder='Name'
        />

        <input
          type='text'
          name='position'
          className='border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-500'
          value={teamData?.position || ''}
          onChange={handleInputChange}
          required
          placeholder='Position'
        />
        <div className='grid grid-cols-1 gap-2'>
          <input
            type='url'
            name='fsblink'
            className='border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500'
            value={teamData?.fsblink || ''}
            onChange={handleInputChange}
            placeholder='Facebook Link'
          />
          <input
            type='url'
            name='twtlink'
            className='border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400'
            value={teamData?.twtlink || ''}
            onChange={handleInputChange}
            placeholder='Twitter Link'
          />
          <input
            type='url'
            name='inslink'
            className='border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-500'
            value={teamData?.inslink || ''}
            onChange={handleInputChange}
            placeholder='Instagram Link'
          />
        </div>
        <input
          type='file'
          name='photos'
          onChange={handleFileChange}
          multiple
          className='border border-gray-300 rounded-lg p-3 w-full'
        />
        {imagePending && (
          <p className='text-blue-600 text-center'>Uploading image...</p>
        )}
        <button
          type='submit'
          disabled={imagePending || isPending}
          className={`${
            imagePending || isPending
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-pink-700 hover:bg-pink-600'
          } w-full text-xl py-3 rounded-lg text-white font-semibold transition`}
        >
          {imagePending || isPending ? 'Loading...' : 'Update Team'}
        </button>
      </form>
    </div>
  )
}
