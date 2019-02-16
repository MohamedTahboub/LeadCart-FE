import React from 'react';
import { navigateTo } from 'libs';
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
  imgSrc, onClick, isLoading, className = '', isActive = false, error, ...props
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
        className={`medium-solid-card white-color ${className}`}
      />
      {error && <span className='payment-error-message'>{error}</span>}
    </span>
  );
};

export const Avatar = ({
  className: classname, style = {}, imageSrc, name
}) => {
  const className = classname ? `product-name-avatar${classname}` : 'product-name-avatar';
  const firstLetters = name.trim().split(' ').map((w) => w[0].toUpperCase()).join('');
  const backgroundColor = genrateColor(firstLetters);
  return (
    imageSrc
      ? <img src={imageSrc} alt={name} className='product-image-avatar' />
      : <span style={{ background: backgroundColor, ...style }} className={className}>{firstLetters}</span>
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

export const BumpOfferTemplateCard = ({ image, active }) => (
  <div className={active ? 'bump-offer-template-card active-bump-offer-template-card' : 'bump-offer-template-card'}>
    <img src={image} alt='Bump offer Template' className='bump-offer-thumbnail' />
  </div>
);


const Label = ({ children, ...props }) => (
  <span className='simple-label'>
    {children}
  </span>
);

// export const UpsellCard = ({
//   name, id, price, onEdit, onPreview, onDelete, linkedProduct: { name: productName } = {}, ...props
// }) => (
//   <div className='upsell-card-container'>
//     <Avatar style={{ margin: 'auto' }} name={name} />
//     <div className='upsell-contnet'>
//       <span className='upsell-name'>
//         {name}
//       </span>
//       <span className='upsell-price'>
//         {price}

//       </span>
//       <span className='upsell-associated-product'>
//         <i className='fas fa-link' />
//         {productName}
//       </span>
//     </div>
//     <div className='upsell-item-controlls'>
//       <i onClick={onEdit} className='fas fa-edit' />
//       <i onClick={onPreview} className='fas fa-book-open' />
//       <i onClick={onDelete} className='fas fa-trash-alt' />
//     </div>
//   </div>
// );


export const UpsellCard = ({
  name, id, active, price: { amount: price } = {}, onEdit, onPreview, onDelete, linkedProduct: { productName, productLink } = {}, ...props
}) => (
  <div className={`upsell-card-container ${active ? 'active-product' : 'inactive-product'}`}>
    <div className='card-main-content product-avatar-holder'>
      <Avatar name={name} />
      <span className='product-name-holder'>{name}</span>
      <span
        onClick={() => productLink && navigateTo(`/product/${productLink}/details`)}
        className={`product-salles-holder ${productLink ? 'item-clickable' : ''}`}
      >
        <i className='fas fa-link' />
        {productName}
      </span>
      <span className='product-price-holder'>{`$ ${price}`}</span>
    </div>
    <div className='card-controlls-container'>
      <i onClick={onEdit} className='fas fa-edit' />
      <i onClick={onPreview} className='fas fa-book-open' />
      <i onClick={onDelete} className='fas fa-trash-alt' />
    </div>
  </div>
);
