import React from 'react';

import './style.css';
import { genrateColor } from './helpers';
export const MiniCard = ({ imgSrc, ...props }) => (
  <img
    src={imgSrc}
    alt='payment service'
    className='small-solid-card white-color'
  />
);
export const MediumCard = ({
  imgSrc, onClick, isLoading, isActive = false, error, ...props
}) => {
  const wraperStatus = isActive
    ? 'success-badge'
    : isLoading ? 'loading-badge'
      : error
        ? 'failure-badge'
        : 'inactive-badge';

  return (
    <span className={wraperStatus}>
      <img
        onClick={onClick}
        src={imgSrc}
        alt='payment service'
        className='medium-solid-card white-color'
      />
      {error && <span className='payment-error-message'>{error}</span>}
    </span>
  );
};

export const Avatar = ({ imageSrc, name }) => {
  const firstLetters = name.trim().split(' ').map((w) => w[0].toUpperCase()).join('');
  const backgroundColor = genrateColor(firstLetters);
  return (
    imageSrc
      ? <img src={imageSrc} alt={name} className='product-image-avatar' />
      : <span style={{ background: backgroundColor }} className='product-name-avatar'>{firstLetters}</span>
  );
};

export const ProductCard = ({
  name, currancy, monthlyProfite = 0, price, available, onEdit, onPreview, onDelete, ...props
}) => (
  <div className={`product-card-container ${available ? 'active-product' : 'inactive-product'}`}>
    <div className='card-main-content product-avatar-holder'>
      <Avatar name={name} />
      <span className='product-name-holder'>{name}</span>
      <span className='product-salles-holder'>
        {monthlyProfite}
          /monthly
      </span>
      <span className='product-price-holder'>{`$ ${price.amount}`}</span>
    </div>
    <div className='card-controlls-container'>
      <i onClick={onEdit} className='fas fa-edit' />
      <i onClick={onPreview} className='fas fa-book-open' />
      <i onClick={onDelete} className='fas fa-trash-alt' />
    </div>
  </div>
);

export const NewThingCard = ({ thing, onClick, ...props }) => (
  <div onClick={onClick} className='product-card-container '>
    <span className='new-product-card'>
      {' '}
      + New
      {' '}
      {thing}
    </span>
  </div>
);
