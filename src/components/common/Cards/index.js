import React, { Fragment, useEffect, useState } from 'react';
import { getCurrencySymbol, openNewWindow, property } from 'libs';
import './style.css';
import { Modal } from 'components/Modals';
import ids from 'shortid';
import PropTypes from 'prop-types';
import clx from 'classnames';

import { Title } from '../Titles';
import { generateColor } from './helpers';
import { Button, MiniButton, SmallButton } from '../Buttons';
import { WarningMessage } from '../Messages';
import Dialog from '../Dialog';
import EasyAnimate from '../Animation/EasyAnimate';
import { AiFillInfoCircle } from 'react-icons/ai';
import { FlexBox } from '../boxes';
import Tooltip from '../Tooltip';

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
  disabled,
  error,
  headline,
  warningInfo,
  ...props
}) => {
  const wraperStatus = isActive
    ? 'success-badge'
    : isLoading ? 'loading-badge'
      : error
        ? 'failure-badge'
        : 'inactive-badge';

  const style = {
    backgroundImage: `url(${imgSrc})`,
    backgroundPosition: 'center',
    backgroundSize: '80%',
    backgroundRepeat: 'no-repeat'
  };

  const renderCard = (
    <div
      style={style}
      onClick={onClick}
      className={`medium-solid-card ${wraperStatus} ${disabled ? 'card-disabled' : ''} ${className}`}
    >
      {headline && <span className='medium-card-headline'>{headline}</span>}
      {error && <span className='payment-error-message'>{error}</span>}
      {children}
      {warningInfo && (
        <AiFillInfoCircle className='payment-warning-message' />
      )}
    </div>
  );
  return warningInfo ? (
    <Tooltip placement='top' text={warningInfo} delay={1} >
      {renderCard}
    </Tooltip>
  ) : renderCard;
};

export const Avatar = ({ className: classname, style = {}, imageSrc, name = '' }) => {
  const className = classname ? `product-name-avatar ${classname}` : 'product-name-avatar';
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
  name,
  image,
  pagePreferences: { image: productImage = image } = {},
  // pagePreferences:{}={}
  currancy,
  orderInList = 0,
  monthlyProfite = 0,
  price,
  currency = 'USD',
  available,
  onEdit,
  category,
  onPreview,
  onDelete,
  onDuplicate,
  ...props
}) => (
  <EasyAnimate
    delay={orderInList * 100}
    className={`product-card-container ${available ? 'active-product' : 'inactive-product'}`}
  >

    <MiniButton
      iconClass='fa-copy'
      onClick={onDuplicate}
      tooltip='Duplicate Product'
      className='product-duplicate-btn'
    />
    <div className='card-main-content product-avatar-holder'>
      {
        productImage
          ? <img src={productImage} alt='product avatar' className='card-product-image' />
          : <Avatar name={name} />
      }
      {
        category && (category === 'checkout' ? (
          <span data-tooltip='Checkout Product'>
            <i className='fas fa-shopping-cart' />
          </span>
        )
          : (
            <span data-tooltip='Upsell Product'>
              <i className='fas fa-chart-line' />
            </span>
          ))
      }
      <span className='product-name-holder'>{name}</span>
      <span className='product-price-holder'>{`${getCurrencySymbol(currency)} ${price}`}</span>
    </div>
    <div className='card-controlls-container'>
      <span data-tooltip='Edit Product'>
        <i onClick={onEdit} className='fas fa-edit' />
      </span>
      {onPreview && (
        <span data-tooltip='Preview Product'>
          <i onClick={onPreview} className='fas fa-eye' />
        </span>
      )}
      <span data-tooltip='Delete Product'>
        <i onClick={onDelete} className='fas fa-trash-alt' />
      </span>
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


// const Label = ({ children, ...props }) => (
//   <span className='simple-label'>
//     {children}
//   </span>
// );


export const UpsellCard = ({ name, orderInList, id, active, price: { amount: price } = {}, onEdit, onPreview, onDelete, linkedProduct: { productName, productLink } = {}, ...props }) => (
  <EasyAnimate delay={orderInList * 100} className={`upsell-card-container ${active ? 'active-product' : 'inactive-product'}`}>
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
      <span data-tooltip='Edit Upsell'>
        <i onClick={onEdit} className='fas fa-edit' />
      </span>
      <span data-tooltip='Preview Upsell'>
        <i onClick={onPreview} className='fas fa-book-open' />
      </span>
      <span data-tooltip='Delete Upsell'>
        <i onClick={onDelete} className='fas fa-trash-alt' />
      </span>
    </div>
  </EasyAnimate>
);


export const PayPalConnectContainer = ({
  imgSrc,
  onConnect,
  headline,
  className,
  ...props
}) => {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [active, setActive] = useState(props.active);
  const [credits, setCredits] = useState({});
  const [showWarringDialogue, setShowWarringDialogue] = useState(false);

  const onChange = ({ target: { value, name } }) => {
    setCredits({ ...credits, [name]: value });
    setErrors({});
  };

  useEffect(() => {
    setActive(props.active);

    return () => {
      setErrors({});
      setSubmitting(false);
      setCredits({});
    };
  }, [props.active, showForm]);

  const onSubmit = async () => {
    if (credits.clientId && credits.clientSecret) {
      setSubmitting(true);
      await onConnect(
        { cred: credits },
        {
          onSuccess: () => {
            setSubmitting(false);
            setShowForm(false);
            setActive(true);
          },
          onFailed: (message) => {
            setSubmitting(false);
            setErrors({ message });
          }
        }
      );
    } else {
      setErrors({ message: 'Fields are not valid' });
    }
  };

  const openConnectModal = () => {
    if (active) setShowWarringDialogue(true);
    else setShowForm(true);
  };

  return (
    <Fragment>
      <MediumCard
        onClick={openConnectModal}
        isActive={active}
        imgSrc={imgSrc}
        headline={headline}
      />
      <Modal
        isVisible={showForm}
        onClose={() => setShowForm(false)}
        className='paypal-connect-container'
      >
        <Title>Connect your PayPal account using PayPal app credentials</Title>
        <form className='paypal-form'>
          <input
            type='text'
            onBlur={onChange}
            name='handler'
            disabled={submitting}
            autoComplete='off'
            className='paypal-connect-input'
            placeholder='Paypal App Name (just for presentation purpose)'
          />
          <input
            type='text'
            onBlur={onChange}
            name='clientId'
            disabled={submitting}
            className='paypal-connect-input'
            placeholder='Paypal App client Id'
          />
          <input
            type='text'
            onBlur={onChange}
            name='clientSecret'
            disabled={submitting}
            className='paypal-connect-input'
            placeholder='Paypal App secret'
          />
          <Button
            disabled={submitting}
            className={submitting ? 'primary-color paypal-submit-btn  spinner' : 'primary-color paypal-submit-btn'}
            onClick={onSubmit}
            children='Connect'
          />
          {errors.message && <div className='paypal-error-message'>{errors.message}</div>}

        </form>
      </Modal>
      <Dialog
        onClose={() => setShowWarringDialogue(false)}
        show={showWarringDialogue}
        title='You have already integrated Paypal with your account'
        confirmBtnText='Continue'
        confirmBtnIcon={null}
        description={(
          <WarningMessage>
            {property('settings.integrations.paypal.overridingWarning')}
          </WarningMessage>
        )}
        onConfirm={() => {
          setShowWarringDialogue(false);
          setTimeout(() => {
            setShowForm(true);
          }, 100);
        }}
      />
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
  orderInList,
  id,
  onEdit,
  onPreview,
  onDelete,
  type: fulfillmentType,
  ...props
}) => (
  <EasyAnimate
    delay={orderInList * 100}
    className='upsell-card-container'
  >
    <div className='card-main-content product-avatar-holder'>
      <Avatar name={name} />
      <span className='product-name-holder'>{name}</span>

      <span className='fulfillment-name-holder'>{fulfillmentType}</span>
    </div>
    <div className='card-controlls-container'>
      <span data-tooltip='Edit Fulfillment'>
        <i onClick={onEdit} className='fas fa-edit' />
      </span>
      <span />
      <span data-tooltip='Delete Fulfillment'>
        <i onClick={onDelete} className='fas fa-trash-alt' />
      </span>
    </div>
  </EasyAnimate>
);


export const CategoryCard = ({
  className = '',
  image,
  label,
  onClick,
  ...props
}) => (
  <div onClick={onClick} className={`category-card-holder ${className}`}>
    <img src={image} alt={label} className='category-card-image' />
    <div className='category-card-title'>{label}</div>
  </div>
);

export const TemplateCard = ({
  className = '',
  image,
  name,
  label,
  withNames,
  active,
  onClick
}) => (
  <FlexBox center='v-center' column onClick={onClick} className={clx('m-4', className, { active })}>
    {withNames && (
      <span className='title-text primary-text bold-text mb-3'>{name}</span>
    )}
    {image ? (
      <img
        src={image}
        alt={name}
        className='template-card-image'
      />
    ) : (
      <div className='template-card-label'>
        <span>
          {label}
        </span>
      </div>
    )}
  </FlexBox>
);


export const FulfillmentRowCard = ({
  _id: id,
  activeFulfillment,
  name,
  onSelect,
  type
}) => (
  <div
    onClick={onSelect(id)}
    className={`sidebar-fulfillment-card ${activeFulfillment === id ? 'active' : ''}`}
  >
    <Avatar name={name} className='sidebar-profile-avatar' />
    <div className='sidebar-fulfillment-card-details'>
      <div className='sidebar-fulfillment-card-name'>{name}</div>
      <div className='sidebar-fulfillment-card-type'>{type}</div>
    </div>
  </div>
);

export const CouponRowCard = ({
  _id: id,
  code,
  discount: {
    type,
    amount,
    percent
  } = {},
  onToggleStatus,
  active
}) => (
  <div
    className='sidebar-fulfillment-card sidebar-custom-coupons-card'
  >
    <Avatar name={code} className='sidebar-profile-avatar' />
    <div className='sidebar-fulfillment-card-details'>
      <div className='sidebar-fulfillment-card-name'>{code}</div>
      <div className='menu-coupon-type'>
        <span className='type'>
          {type}
          {' '}
            =>
        </span>
        <span className='value'>{type === 'Flat' ? ` $${amount}` : `${percent}%`}</span>
      </div>
    </div>
    <SmallButton
      onClick={() => onToggleStatus({ couponId: id, active: !active })}
      className={active ? 'green-color' : 'gray-bg'}
    >
      {`${active ? 'Active' : 'Inactive'}`}
    </SmallButton>
  </div>
);


export { default as PackageCard } from './PackageCard';
export { default as CheckCard } from './CheckCard';


export const Card = ({
  children,
  style,
  className,
  onClick,
  ...props
}) => (
  <div
    onClick={onClick}
    style={style}
    className={`card-container ${className}`}
    role='presentation'
    {...props}
  >
    {children}
  </div>
);

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOf([PropTypes.node, HTMLBaseElement, null]).isRequired
};
Card.defaultProps = { className: '' };

