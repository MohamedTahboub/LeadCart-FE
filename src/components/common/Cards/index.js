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
export const ProductAvatar = ({ imageSrc, name }) => (
    imageSrc ?
        <img src={imageSrc} alt={name} className='product-image-avatar'></img>
        :
        <span className='product-name-avatar'>{name.splice(2)}</span>
)

export const ProductCard = ({ name,currancy, monthlyProfite, price, onEdit, onExplore, onDelete, ...props }) => (
    <div className='product-card-container'>
        <div className='product-avatar-holder'>
            <ProductAvatar {...props}/>
            <span className='product-profit-holder'>{monthlyProfite}</span>
            <span className='product-price-holder'>{`${currancy+price}`}</span>
        </div>
    </div>
        )

export const NewProductCard = props =>(
    <div className='product-card-container new-product-card'>
        +New Product
    </div>
)
