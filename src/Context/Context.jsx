import React, { createContext, useState } from 'react'

export const ContextData = createContext()

export const Context = ({ children }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [showAlerterr, setShowAlerterr] = useState(false)
  const [showAlertInfo, setShowAlertInfo] = useState('')
  const [sideBar, setSideBar] = useState(false)
  const [isErr, setIsErr] = useState(false)
  const [delete_, setDelete_] = useState([])
  return (
    <ContextData.Provider
      value={{
        sideBar,
        setSideBar,
        showConfirm,
        setShowConfirm,
        showAlertInfo,
        showAlerterr,
        setShowAlertInfo,
        setShowAlerterr,
        setIsErr,
        isErr,
        setDelete_,
        delete_
      }}
    >
      {children}
    </ContextData.Provider>
  )
}
