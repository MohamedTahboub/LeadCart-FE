import React, { useState } from 'react';
import { openNewWindow } from 'libs';
import './style.css';
import { Modal } from 'components/Modals';
import { genrateColor } from './helpers';
import { SmallButton } from '../Buttons';
import EasyAnimate from '../Animation/EasyAnimate';
import ids from 'shortid'

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
        <i onClick={onPreview} className='fas fa-book-open' />
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


export const PayPalConnectContainer = (props) => {
  const initialState = {
    modal: false,
    loading: false,
    error: 'something gonn wrong'
  };
  const [state, setState] = useState({ ...initialState, ...props });

  const {
    imgSrc, onConnect, loading, className = '', active, error
  } = state;
  const toggleModal = () => setState({ ...state, modal: !state.modal });
  const onOpenForm = () => setState({ ...state, modal: true });
  
  const isActive = active ? 'paypal-success-badge' : '';

  const onChange = ({ target: { value, name } }) => {
    if (value) setState({ ...state, error: '', [name]: value });
  };
  const onSubmit = () => {
    const { client_id: clientId, client_secret: clientSecret } = state;

    // const creditSchema = yup.object({
    //   clientId : yup.string().min(10).required('This Should be '),
    //   clientSecret:yup.string().required().min(10),
    // }).required()

    if (clientId && clientSecret) {
      onConnect({ clientId, clientSecret });
      setState({ ...state, active: false, loading: true });
    }
  };

  if (loading && error || loading && active) setState({ ...state, loading: false });
  return (
    <MediumCard
      onClick={onOpenForm}
      isActive={active}
      imgSrc={imgSrc}
    >
      <Modal isVisible={state.modal} onClose={toggleModal} className='paypal-connect-container'>
        <form className='paypal-form'>
          <input
            type='text'
            onChange={onChange}
            name='client_id'
            disabled={loading}
            className='paypal-connect-input'
            placeholder='Paypal App client Id'
          />
          <input
            type='text'
            onChange={onChange}
            name='client_secret'
            disabled={loading}
            className='paypal-connect-input'
            placeholder='Paypal App secret'
          />
          <SmallButton
            disabled={loading}
            className={loading ? 'primary-color spinner' : 'primary-color'}
            onClick={onSubmit}
            children='Connect'
          />
          {error && <span className='paypal-error-message'>{error}</span>}
        </form>
      </Modal>
    </MediumCard>

  );
};


export const RadioImageCard = ({ title, image, name = 'radio-image', className = '', ...props }) => {
  const id = ids.generate()
  return (
    <div className={`radio-image-card-container ${className}`}>
      <input
        type="radio"
        name={name}
        id={id}
        className='radio-image-input'
      />
      <label
        className="radio-image-label"
        htmlFor={id}
      >
        <span className="radio-image-label-title">
          {title}
        </span>
        <div className="radio-image-card-image">
          <img
            alt={name}
            src={image}
          />
        </div>
      </label>
    </div>
  )
}