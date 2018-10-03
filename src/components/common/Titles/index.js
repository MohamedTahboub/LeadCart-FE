import React from 'react'

import './style.css'


export const MainTitle = ({ handle, children, props }) => (
    <div className='main-title-container'>
        {handle && <span className='main-title-handle'><i class={"fas " + handle.iconClass}></i>{handle.label}</span>}
        <span className='main-title'>{children}</span>
    </div>
)
