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
    border: `${style.borderWidth || 0}px ${style.borderStyle || 'solid'} ${style.borderColor}`,
    borderRadius: `${style.borderRadius}px`
  };
  const headerStyle = {
    background: style.headerBackground,
    color: style.headerTextColor,
    border: `${style.borderWidth || 0}px ${style.borderStyle || 'solid'} ${style.borderColor}`,
    borderRadius: `${style.borderRadius}px`
  };
  return (
    offer.enabled
      ? (

        <section style={containerStyle} className='product-template-bump-offer'>
          <FloatButton onClick={onDisable} position={{ left: 0 }}>
            <i className='fas fa-eye-slash' />
          </FloatButton>
          <div style={headerStyle} className='template-bump-offer-title'>
            <input
              type='checkbox'
              id='bump-offer-checkbox'
              disabled
            />
            <label id='bump-offer-checkbox-label' htmlFor='bump-offer-checkbox'>
              <EditableField
                name='offer.title'
                // color={headerStyle.color}
                value={offer.title}
                defaultValue='Offer Title Goes Here'
                onChange={onChange}
                className='template-bump-offer-title-input'
              />
            </label>
          </div>
          <div style={{ color: containerStyle.color }} className='template-bump-offer-description'>
            <EditableField
              name='offer.introText'
              defaultValue='Offer intro statement'
              value={offer.introText}
              onChange={onChange}
              className='template-bump-offer-description-title'
            />
            <EditableField
              name='offer.bodyText'
              defaultValue='Offer Description goes here,lorem'
              value={offer.bodyText}
              onChange={onChange}
              textarea
              className='template-bump-offer-description-content'
            />
          </div>
        </section>
      )
      : null
  );
};

export default BumpOffer;
