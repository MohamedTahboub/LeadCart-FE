import React, { Fragment, useState, useEffect } from 'react';
import { openNewWindow } from 'libs';
import './style.css';
import { Modal } from 'components/Modals';
import ids from 'shortid';
import { Title } from '../Titles';
import { generateColor } from './helpers';
import { SmallButton } from '../Buttons';
import EasyAnimate from '../Animation/EasyAnimate';

export const MiniCard = ({ imgSrc, ...props }) => (
  <img
    src={imgSrc}
    alt='payment service'
    className='small-solid-card white-color'
  />
);
export const MediumCard = ({
  imgSrc,
  onClick,
  isLoading,
  children,
  className = '',
  isActive = false,
  error,
  headline,
  ...props
}) => {
  const wraperStatus = isActive
    ? 'success-badge'
    : isLoading ? 'loading-badge'
      : error
        ? 'failure-badge'
        : 'inactive-badge';

  return (
    <span onClick={onClick} className={wraperStatus}>
      <img
        src={imgSrc}
        alt='payment service'
        className={`medium-solid-card white-color ${className}`}
      />
      {headline && <span className='medium-card-headline'>{headline}</span>}
      {error && <span className='payment-error-message'>{error}</span>}
      {children}
    </span>
  );
};

export const Avatar = ({
  className: classname, style = {}, imageSrc, name = ''
}) => {
  const className = classname ? `product-name-avatar${classname}` : 'product-name-avatar';
  const [firstWord = '', secondeWord = ''] = name.trim().split(' ');
  const words = (`${firstWord[0]}${secondeWord[0]}`).toUpperCase();
  const backgroundColor = generateColor(words);
  return (
    imageSrc
      ? <img src={imageSrc} alt={words} className='product-image-avatar' />
      : <span style={{ background: backgroundColor, ...style }} className={className}>{words.slice(0, 2)}</span>
  );
};

export const ProductCard = ({
  name, currancy, orderInlist = 0, monthlyProfite = 0, price, available, onEdit, onPreview, onDelete, ...props
}) => (
  <EasyAnimate delay={orderInlist * 100} className={`product-card-container ${available ? 'active-product' : 'inactive-product'}`}>
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
      <i onClick={onPreview} className='fas fa-eye' />
      <i onClick={onDelete} className='fas fa-trash-alt' />
    </div>
  </EasyAnimate>
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


export const UpsellCard = ({
  name, orderInlist, id, active, price: { amount: price } = {}, onEdit, onPreview, onDelete, linkedProduct: { productName, productLink } = {}, ...props
}) => (
  <EasyAnimate delay={orderInlist * 100} className={`upsell-card-container ${active ? 'active-product' : 'inactive-product'}`}>
    <div className='card-main-content product-avatar-holder'>
      <Avatar name={name} />
      <span className='product-name-holder'>{name}</span>
      <span
        onClick={() => productLink && openNewWindow(`/product/${productLink}/details`)}
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
  </EasyAnimate>
);


export const PayPalConnectContainer = ({
  imgSrc,
  onConnect,
  className,
  ...props
}) => {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [active, setActive] = useState(props.active);
  const [credits, setCredits] = useState({});

  const onChange = ({ target: { value, name } }) => {
    setCredits({ ...credits, [name]: value });
    setErrors({});
  };

  useEffect(() => {
    setActive(props.active);
  }, [props]);

  const onSubmit = async () => {
    if (credits.clientId && credits.clientSecret) {
      setSubmitting(true);
      await onConnect(
        credits,
        {
          onSuccess: () => {
            setSubmitting(false);
            setShowForm(false);
          },
          onFailed: (err = {}) => {
            setSubmitting(false);
            setErrors({ message: err.message });
          }
        }
      );
    } else {
      setErrors({
        message: 'Fields are not valid'
      });
    }
  };

  return (
    <Fragment>
      <MediumCard
        onClick={() => setShowForm(true)}
        isActive={active}
        imgSrc={imgSrc}
      />
      <Modal
        isVisible={showForm}
        onClose={() => setShowForm(false)}
        className='paypal-connect-container'
      >
        <Title>Connect your paypal account using paypal app credit</Title>
        <form className='paypal-form'>
          <input
            type='text'
            onChange={onChange}
            name='clientId'
            disabled={submitting}
            className='paypal-connect-input'
            placeholder='Paypal App client Id'
          />
          <input
            type='text'
            onChange={onChange}
            name='clientSecret'
            disabled={submitting}
            className='paypal-connect-input'
            placeholder='Paypal App secret'
          />
          {errors.message && <span className='paypal-error-message'>{errors.message}</span>}
          <SmallButton
            disabled={submitting}
            className={submitting ? 'primary-color paypal-submit-btn  spinner' : 'primary-color paypal-submit-btn'}
            onClick={onSubmit}
            children='Connect'
          />
        </form>
      </Modal>
    </Fragment>
  );
};


export const RadioImageCard = ({
  title,
  onClick,
  image,
  name = 'radio-image',
  className = '',
  ...props
}) => {
  const id = ids.generate();
  return (
    <div className={`radio-image-card-container ${className}`}>
      <input
        type='radio'
        name={name}
        id={id}
        className='radio-image-input'
      />
      <label
        className='radio-image-label'
        htmlFor={id}
        onClick={onClick}
      >
        <span className='radio-image-label-title'>
          {title}
        </span>
        <div className='radio-image-card-image'>
          <img
            alt={name}
            src={image}
          />
        </div>
      </label>
    </div>
  );
};


export const FulfillmentCard = ({
  name,
  orderInlist,
  id,
  onEdit,
  onPreview,
  onDelete,
  type: fulfillmentType,
  ...props
}) => (
  <EasyAnimate
    delay={orderInlist * 100}
    className='upsell-card-container'
  >
    <div className='card-main-content product-avatar-holder'>
      <Avatar name={name} />
      <span className='product-name-holder'>{name}</span>

      <span className='fulfillment-name-holder'>{fulfillmentType}</span>
    </div>
    <div className='card-controlls-container'>
      <i onClick={onEdit} className='fas fa-edit' />
      <i onClick={onPreview} className='fas fa-book-open hide-element' />
      <i onClick={onDelete} className='fas fa-trash-alt' />
    </div>
  </EasyAnimate>
);
