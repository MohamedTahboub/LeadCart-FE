import React from 'react'

import './style.css'

export const MainBlock = ({ title, notes, children, ...props }) => (
    <div className='main-block'>
        <div className='main-title-container'>
            <span className='main-title'>{title}</span>
            {notes && <span className='main-title-note'>{notes}</span>}
        </div>
        <div className='box-container'>
            {children}
        </div>
    </div>
)
