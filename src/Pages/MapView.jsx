import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import Axios from '../Axios'
import { Link } from 'react-router-dom'

const center = { lat: 40.9983, lng: 71.6726 }

export const ViewMap = () => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await Axios.get('/map')
        setLocations(res.data)
      } catch (error) {
        console.error('Error fetching locations:', error)
      }
    }
    fetchLocations()
  }, [])

  return (
    <div className='flex flex-col items-center gap-6 p-6 bg-green-50 min-h-screen h-screen overflow-y-auto pb-[100px]'>
      <div className='w-full flex items-center justify-between pb-3 flex-wrap gap-3 border-b border-pink-300'>
        <h1 className='text-3xl font-bold text-pink-700'>🌸 Saved Locations</h1>
        <Link
          className='p-3 px-5 rounded-full bg-pink-700 text-white hover:bg-pink-800 transition-all'
          to={'/add-maps'}
        >
          + Add Location
        </Link>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-6 items-center'>
        <div className='flex flex-wrap gap-4 w-full md:w-1/3'>
          {locations.length > 0 ? (
            locations.map((loc, index) => (
              <div
                key={index}
                className='bg-white p-4 rounded-lg shadow-md border border-pink-300'
              >
                <p className='text-pink-700 font-bold text-lg'>
                  {loc.mapsName}
                </p>
              </div>
            ))
          ) : (
            <p className='text-gray-600 text-lg'>No locations saved yet. 🌿</p>
          )}
        </div>

        <div className='w-full md:w-2/3'>
          <MapContainer
            center={center}
            zoom={10}
            className='w-full h-[400px] rounded-xl shadow-md border-4 border-pink-300'
          >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

            {locations.map((loc, index) =>
              loc.coordinates.map((coord, i) => (
                <Marker key={`${index}-${i}`} position={[coord.lat, coord.lng]}>
                  <Popup>
                    <div className='text-center'>
                      <h2 className='font-bold text-pink-700'>{loc.name}</h2>
                      📍 Lat: {coord.lat} <br />
                      📍 Lng: {coord.lng}
                    </div>
                  </Popup>
                </Marker>
              ))
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
