import React from 'react'

import './style.css'
import { genrateColor } from './helpers'
export const MiniCard = ({ imgSrc, ...props }) => {

    return (
        <img
            src={imgSrc}
            alt='payment service'
            className='small-solid-card white-color' />
    )
}

export const Avatar = ({ imageSrc, name }) => {
    const firstLetters = name.trim().split(' ').map(w => w[0].toUpperCase()).join('')
    const backgroundColor = genrateColor(firstLetters)
    return (
        imageSrc ?
            <img src={imageSrc} alt={name} className='product-image-avatar'></img>
            :
            <span style={{ background: backgroundColor }} className='product-name-avatar'>{firstLetters}</span>
    )
}

export const ProductCard = ({ name, currancy, monthlyProfite, price, onEdit, onExplore, onDelete, ...props }) => (
    <div className='product-card-container'>
        <div className='card-main-content product-avatar-holder'>
            <Avatar name={name} />
            <span className='product-name-holder'>{name}</span>
            <span className='product-salles-holder'>{monthlyProfite}/monthly</span>
            <span className='product-price-holder'>{`${currancy + price}`}</span>
        </div>
        <div className='card-controlls-container'>
            <i class="fas fa-edit"></i>
            <i class="fas fa-book-open"></i>
            <i class="fas fa-trash-alt"></i>
        </div>
    </div>
)

export const NewThingCard = ({thing , onClick , ...props}) => (
    <div onClick={onClick} className='product-card-container '>
        <span className="new-product-card"> + New {thing}</span>
    </div>
)
