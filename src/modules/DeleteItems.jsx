import { useContext } from 'react'
import Axios from '../Axios'
import { ContextData } from '../Context/Context'
import { useNavigate } from 'react-router-dom'

export const DeleteItems = (which, id) => {
  const { setShowAlertInfo, setShowAlerterr, setIsErr, delete_, setDelete_ } =
    useContext(ContextData)
  const nav = useNavigate()
  return async () => {
    try {
      await Axios.delete(`${which}/${id}`)
      setShowAlertInfo('Deleted successfully')
      setShowAlerterr(true)
      setDelete_([])
      window.location = delete_[0]
    } catch (error) {
      setShowAlerterr(true)
      setIsErr(true)
      setShowAlertInfo(error.response?.data?.message)
    }
  }
}
