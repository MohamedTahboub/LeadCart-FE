import React from 'react'

import './style.css'
export const Page = ({ children, className = '', ...props }) => {

  return (
    <div className={`page-container ${className}`}>
      {children}
    </div>
  )
}
export const PageHeader = ({ children, className = '', ...props }) => {

  return (
    <div className={`page-header ${className}`}>
      {children}
    </div>
  )
}

export const PageContent = ({ children, className = '', ...props }) => {

  return (
    <div className={`page-content-container ${className}`}>
      {children}
    </div>
  )
}

