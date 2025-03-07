import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { MapPinPlus } from 'lucide-react'
import Axios from '../Axios'

import 'leaflet/dist/leaflet.css'
import { IsOpenModal } from '../Components/css/Modal'
import { mutate } from 'swr'

const center = { lat: 40.9983, lng: 71.6726 }

export const AddMap = ({ isOpen, setIsOpen }) => {
  const [marker, setMarker] = useState(null)
  const [mapData, setMapData] = useState({})
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = e => {
    const { name, value } = e.target
    setMapData(prevData => ({ ...prevData, [name]: value }))
  }

  const MapClickHandler = () => {
    useMapEvents({
      click: e => {
        setMarker({ lat: e.latlng.lat, lng: e.latlng.lng })
      }
    })
    return null
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (marker) {
      setIsPending(true)
      try {
        await Axios.post('/map', { ...mapData, coordinates: marker })
        setMarker(null)
        setIsOpen(false)
        IsOpenModal(false)
        mutate('/map')
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred')
      } finally {
        setIsPending(false)
      }
    } else alert('Add Location')
  }

  return (
    <div
      className={`fixed transition-all duration-300 z-[9999] h-screen top-0 ${
        isOpen ? 'right-0 bg-black/90' : '-right-full'
      } flex justify-end items-center w-full`}
    >
      <form
        onSubmit={handleSubmit}
        className='w-full h-full max-w-md md:max-w-lg bg-white p-2 md:p-8 shadow-2xl border border-pink-300'
      >
        <h1 className='text-center text-2xl font-bold text-pink-600 mb-4 flex items-center gap-2'>
          <MapPinPlus /> Add New Location
        </h1>
        <MapContainer
          center={center}
          zoom={10}
          className='w-full h-[300px] rounded-xl shadow-md mb-4'
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <MapClickHandler />
          {marker && <Marker position={[marker.lat, marker.lng]} />}
        </MapContainer>
        <div className='flex gap-2'>
          <input
            type='text'
            placeholder='Location Name'
            name='name'
            onChange={handleInputChange}
            required
            className='w-full border border-pink-300 p-3 rounded-md mb-2 focus:ring-2 focus:ring-pink-500 outline-none'
          />
          <input
            type='text'
            placeholder='Street Name'
            name='mapsName'
            onChange={handleInputChange}
            required
            className='w-full border border-pink-300 p-3 rounded-md mb-2 focus:ring-2 focus:ring-pink-500 outline-none'
          />
        </div>
        <input
          type='number'
          placeholder='Phone Number'
          name='mapsPhone'
          onChange={handleInputChange}
          required
          className='w-full border border-pink-300 p-3 rounded-md mb-2 focus:ring-2 focus:ring-pink-500 outline-none'
        />
        <input
          type='text'
          placeholder='Operating Hours (e.g. 12:00-13:00)'
          name='mapsTime'
          onChange={handleInputChange}
          required
          className='w-full border border-pink-300 p-3 rounded-md mb-2 focus:ring-2 focus:ring-pink-500 outline-none'
        />

        {error && <p className='text-red-500'>{error}</p>}
        <div className='grid grid-cols-2 gap-3 mt-4'>
          <button
            onClick={() => {
              setIsOpen(false)
              IsOpenModal(false)
            }}
            className='bg-gray-400 rounded-md flex justify-center text-white py-3 font-bold hover:bg-gray-500 transition'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isPending}
            className={`${
              isPending ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-500'
            } rounded-md text-white py-3 font-bold hover:bg-pink-600 transition`}
          >
            {isPending ? 'Loading...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
