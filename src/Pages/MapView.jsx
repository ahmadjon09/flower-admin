import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Link } from 'react-router-dom'
import { Phone, X } from 'lucide-react'
import { fetcher } from '../Middlewares/Fetcher'
import useSWR, { mutate } from 'swr'
import { Hourglass } from '@phosphor-icons/react'
import Axios from '../Axios'

const center = { lat: 40.9983, lng: 71.6726 }

export const ViewMap = () => {
  const { data, error, isLoading } = useSWR('/map', fetcher)

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this location?'))
      return
    try {
      await Axios.delete(`map/${id}`)
      mutate(
        '/map',
        data.data?.filter(map => map._id !== id),
        true
      )
      alert('Location deleted successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete location')
    }
  }
  return (
    <div className='flex flex-col items-center gap-6 p-4 pb-[100px]'>
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
        <div className='flex flex-col items-center justify-start max-h-[450px] overflow-y-auto w-full md:w-1/3'>
          {isLoading ? null : data.length > 0 ? (
            data.map((loc, index) => (
              <div key={index} className='w-full rounded-lg p-3'>
                <div className='font- text-lg relative'>
                  <h1>
                    Location name: <b>{loc.name}</b>
                  </h1>
                  <h1>
                    Street Name: <b>{loc.mapsName}</b>
                  </h1>
                  <h1>
                    Phone number: <b>+(998) {loc.mapsPhone}</b>
                  </h1>
                  <h1 className='mb-2'>
                    Operating mode: <b>{loc.mapsTime}</b>
                  </h1>
                  <hr />
                  <button
                    onClick={() => handleDelete(loc._id)}
                    className='flex absolute -top-1.5 -right-1.5 w-[20px] h-[20px] bg-red-500 text-white items-center justify-center rounded-full'
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
          {isLoading ? (
            <p>Loading..</p>
          ) : (
            <MapContainer
              center={center}
              zoom={10}
              className='w-full h-[400px] rounded-xl shadow-md border-4 border-pink-300'
            >
              <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

              {data.map((loc, index) =>
                loc.coordinates.map((coord, i) => (
                  <Marker
                    key={`${index}-${i}`}
                    position={[coord.lat, coord.lng]}
                  >
                    <Popup>
                      <div className='text-center'>
                        <h2 className='font-bold text-pink-700'>{loc.name}</h2>
                        <div className='flex items-start justify-center flex-col'>
                          <div className='flex items-center gap-1'>
                            <Phone size={13} /> Phone number: +(998){' '}
                            {loc.mapsPhone}
                          </div>
                          <div className='flex items-center gap-1'>
                            <Hourglass /> Operating mode: {loc.mapsTime}
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
