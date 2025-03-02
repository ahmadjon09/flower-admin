import React, { useContext, useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import { ContextData } from '../Context/Context'

export const SetAlertErr = () => {
  const {
    showAlerterr,
    isErr,
    setShowAlerterr,
    showAlertInfo,
    setShowAlertInfo,
    setIsErr
  } = useContext(ContextData)

  useEffect(() => {
    if (showAlertInfo) {
      const timer = setTimeout(() => {
        setShowAlerterr(false)
        setIsErr(false)
        setTimeout(() => setShowAlertInfo(''), 500)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showAlertInfo])

  return (
    <>
      {showAlerterr ? (
        <div
          className={`fixed bottom-0 left-0 w-full h-[100px] z-[9999] flex items-center justify-center transition-transform duration-500 ${
            showAlerterr ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {showAlertInfo && (
            <div
              className={`${
                isErr ? 'bg-red-600' : 'bg-green-600'
              } text-white z-30 p-3 flex gap-2 items-center rounded-2xl shadow-lg`}
            >
              {isErr ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
              {showAlertInfo}
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}
