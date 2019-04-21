import React from 'react';
import common from 'components/common';

import './style.css';

const { EditableField, FloatButton } = common;

const BumpOffer = ({
  onOptionSelected,
  offer: { style = {}, ...offer } = {},
  onChange
}) => {
  const onDisable = () => {
    onChange({
      target: {
        name: 'offer.enabled',
        value: false
      }
    });
  };
  const containerStyle = {
    background: style.containerBackground,
    color: style.containerTextColor,
    border: `${style.borderWidth || 0}px ${style.borderStyle || 'solid'} ${style.borderColor}`
  };
  console.log(containerStyle);
  const headerStyle = {
    background: style.headerBackground,
    color: style.headerTextColor,
    border: `${style.borderWidth || 0}px ${style.borderStyle || 'solid'} ${style.borderColor}`
  };
  return (
    offer.enabled
      ? (

        <section style={containerStyle} className='product-template-bump-offer'>
          <FloatButton
            onClick={() => onOptionSelected('BumpOptions')}
            position={{ left: 10 }}
          >
            <i className='fas fa-cog' />
          </FloatButton>
          <FloatButton onClick={onDisable} position={{ left: 35 }}>
            <i className='fas fa-eye-slash' />
          </FloatButton>
          <div className='template-bump-offer-title'>
            <input
              type='checkbox'
              id='bump-offer-checkbox'
              disabled
            />
            <label htmlFor='bump-offer-checkbox'>
              <EditableField
                name='offer.title'
                style={headerStyle}
                value={offer.title}
                defaultValue='Offer Title Goes Here'
                onChange={onChange}
                className='template-bump-offer-title-input'
              />
            </label>
          </div>
          <div className='template-bump-offer-description'>
            <div>
              <EditableField
                name='offer.introText'
                defaultValue='Offer intro statement'
                value={offer.introText}
                onChange={onChange}
                className='template-bump-offer-description-title'
              />
            </div>
            <div>
              <EditableField
                name='offer.bodyText'
                defaultValue='Offer Description goes here,lorem'
                value={offer.bodyText}
                onChange={onChange}
                textarea
                className='template-bump-offer-description-content'
              />
            </div>
          </div>
        </section>
      )
      : null
  );
};

export default BumpOffer;
