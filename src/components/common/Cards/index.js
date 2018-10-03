import React from 'react'

import './style.css'
export const MiniCard = ({ imgSrc, ...props }) => {

console.log(imgSrc)

    return (
        <img
            src={imgSrc}
            alt='payment service'
            className='small-solid-card white-color' />
    )
}