import React from 'react'

import './style.css'

const classes = (flex, column) => `${flex ? 'display-flex' : ''} ${column ? 'flex-column' : ''}`


export const Page = ({ children, className = '', dflex, flexColumn, ...props }) => {

  return (
    <div className={`page-container ${className} ${classes(dflex, flexColumn)}`}>
      {children}
    </div>
  )
}
export const PageHeader = ({ children, className = '', dflex, flexColumn, ...props }) => {

  return (
    <div className={`page-header ${className} ${classes(dflex, flexColumn)}`}>
      {children}
    </div>
  )
}

export const PageContent = ({ children, className = '', dflex, flexColumn, ...props }) => {
  return (
    <div className={`page-content-container ${className} ${classes(dflex, flexColumn)}`}>
      {children}
    </div>
  )
}

