import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState, useEffect, useContext } from 'react'
import 'leaflet/dist/leaflet.css'
import Axios from '../Axios'
import { Link } from 'react-router-dom'
import { ContextData } from '../Context/Context'
import { MapPinArea } from '@phosphor-icons/react/dist/ssr'
import { X } from 'lucide-react'

const center = { lat: 40.9983, lng: 71.6726 }

export const ViewMap = () => {
  const [locations, setLocations] = useState([])
  const [pad, setPad] = useState(false)

  const { setIsErr, setShowAlerterr, setDelete_, setShowConfirm } =
    useContext(ContextData)
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setPad(true)
        const res = await Axios.get('/map')
        setLocations(res.data)
        setPad(false)
      } catch (error) {
        setShowAlerterr(error.response?.data?.message || 'Unknown error')
        setIsErr(true)
        setPad(false)
      }
    }
    fetchLocations()
  }, [])
  const handleDelete = id => {
    setShowConfirm(true)
    setDelete_(['map', `${id}`])
  }
  return (
    <div className='flex flex-col items-center gap-6 p-4 bg-green-50 min-h-screen h-screen overflow-y-auto pb-[100px]'>
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
          {pad ? null : locations.length > 0 ? (
            locations.map((loc, index) => (
              <div
                key={index}
                className='bg-white p-4 rounded-lg shadow-md border border-pink-300'
              >
                <div className='text-pink-700 font-bold text-lg relative'>
                  {loc.mapsName}
                  <button
                    onClick={() => handleDelete(loc._id)}
                    className='flex absolute -top-7 -right-6 w-[20px] h-[20px] bg-red-500 text-white items-center justify-center rounded-full'
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-600 text-lg'>No locations saved yet. 🌿</p>
          )}
        </div>

        <div className='w-full md:w-2/3'>
          {pad ? (
            <p>Loading..</p>
          ) : (
            <MapContainer
              center={center}
              zoom={10}
              className='w-full h-[400px] rounded-xl shadow-md border-4 border-pink-300'
            >
              <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

              {locations.map((loc, index) =>
                loc.coordinates.map((coord, i) => (
                  <Marker
                    key={`${index}-${i}`}
                    position={[coord.lat, coord.lng]}
                  >
                    <Popup>
                      <div className='text-center'>
                        <h2 className='font-bold text-pink-700'>
                          {loc.mapsName}
                        </h2>
                        <div className='flex items-center justify-center flex-col'>
                          <div className='flex items-center gap-1'>
                            <MapPinArea /> Lat: {coord.lat}
                          </div>
                          <div className='flex items-center gap-1'>
                            <MapPinArea /> Lng: {coord.lng}
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))
              )}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  )
}
