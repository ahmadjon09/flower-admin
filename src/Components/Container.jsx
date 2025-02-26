import React from 'react'

export const Container = ({ children, className }) => {
  return <div className={'container' + ' ' + className}>{children}</div>
}
