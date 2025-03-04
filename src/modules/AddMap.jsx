import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import { MapPinCheckIcon, MapPinPlus } from 'lucide-react'
import Axios from '../Axios'
import { useNavigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'

const center = { lat: 40.9983, lng: 71.6726 }

export const AddMap = () => {
  const navigate = useNavigate()
  const [marker, setMarker] = useState(null)
  const [mapData, setMapData] = useState({})
  const handleInputChange = e => {
    const { name, value } = e.target
    setMapData(prevData => ({ ...prevData, [name]: value }))
  }

  const MapClickHandler = () => {
    useMapEvents({
      click: e => {
        setMarker({
          lat: e.latlng.lat,
          lng: e.latlng.lng
        })
      }
    })
    return null
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const mapData_ = {
      ...mapData,
      coordinates: marker
    }
    if (marker) {
      try {
        await Axios.post('/map', mapData_)
        setMarker(null)
        navigate('/map')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='flex flex-col items-center gap-6 p-2'>
      <h1 className='text-3xl font-bold text-pink-700 flex items-center gap-1 flex-wrap'>
        <MapPinPlus /> New Location
      </h1>

      <div className='flex flex-wrap gap-2 w-full h-full items-center justify-center'>
        <MapContainer
          center={center}
          zoom={10}
          className='max-w-[300px] w-[300px] h-[320px] rounded-xl shadow-md'
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <MapClickHandler />
          {marker && <Marker position={[marker.lat, marker.lng]} />}
        </MapContainer>

        <form
          onSubmit={handleSubmit}
          className='min-w-[300px] w-[300px] space-y-3 max-w-m'
        >
          <input
            type='text'
            placeholder='Location name'
            name='name'
            onChange={handleInputChange}
            required
            className='w-full border border-green-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 outline-none'
          />
          <input
            type='text'
            placeholder='Street Name'
            name='mapsName'
            onChange={handleInputChange}
            required
            className='w-full border border-green-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 outline-none'
          />
          <input
            type='number'
            placeholder='Phone Number'
            name='mapsPhone'
            onChange={handleInputChange}
            required
            className='w-full border border-green-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 outline-none'
          />
          <input
            type='text'
            placeholder='Operating mode EX: 12:00-13:00'
            name='mapsTime'
            onChange={handleInputChange}
            required
            className='w-full border border-green-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 outline-none'
          />

          {marker && (
            <p className='mt-4 text-gray-600 text-sm'>
              <strong>Coordinates:</strong> {marker.lat}, {marker.lng}
            </p>
          )}

          <button
            type='submit'
            className='w-full mt-4 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300'
          >
            <MapPinCheckIcon size={18} /> Save
          </button>
        </form>
      </div>
    </div>
  )
}
