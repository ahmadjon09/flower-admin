import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { useContext, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapPinCheckIcon, MapPinPlus } from 'lucide-react'
import Axios from '../Axios'
import { useNavigate } from 'react-router-dom'
import { ContextData } from '../Context/Context'

const center = { lat: 41.2995, lng: 69.2401 }

export const AddMap = () => {
  const navigate = useNavigate()

  const [marker, setMarker] = useState(null)
  const [mapsName, setMapsName] = useState('')
  const { setShowAlertInfo, setShowAlerterr } = useContext(ContextData)
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
    if (!marker || !mapsName) {
      setShowAlertInfo('Enter a location name and select a place!')
      setShowAlerterr(true)
    }

    const mapData = {
      name: 'Test',
      mapsName,
      coordinates: marker
    }
    if (marker && mapsName) {
      try {
        await Axios.post('/map/maps', mapData)
        setMarker(null)
        setMapsName('')
        navigate('/maps')
        setShowAlertInfo('Location added successfully ')
        setShowAlerterr(true)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  return (
    <div className='flex flex-col items-center gap-6 p-6 bg-green-50 min-h-screen pb-[100px] h-screen overflow-y-auto'>
      <h1 className='text-3xl font-bold text-pink-700 flex items-center gap-1 flex-wrap'>
        <MapPinPlus /> New Location
      </h1>

      <MapContainer
        center={center}
        zoom={10}
        className='w-full h-[300px] rounded-xl shadow-md'
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <MapClickHandler />
        {marker && <Marker position={[marker.lat, marker.lng]} />}
      </MapContainer>

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'
      >
        <input
          type='text'
          placeholder='Location name'
          value={mapsName}
          onChange={e => setMapsName(e.target.value)}
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
  )
}
