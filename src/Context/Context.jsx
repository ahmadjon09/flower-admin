import React, { createContext, useState } from 'react'

export const ContextData = createContext()

export const Context = ({ children }) => {
  const [sideBar, setSideBar] = useState(false)
  return (
    <ContextData.Provider value={{ sideBar, setSideBar }}>
      {children}
    </ContextData.Provider>
  )
}
