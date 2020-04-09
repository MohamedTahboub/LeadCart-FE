import React from 'react';
import common from 'components/common';
import { useContext } from '../../../../../../actions';
import './style.css';

const { EditableField, FloatButton } = common;

const BumpOffer = ({
  // onOptionSelected,
  section = {},
  // offer: { style = {}, ...offer } = {},
}) => {
  const {
    styles = {},
    content = {}
  } = section;
  const { actions } = useContext();

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section,
      field: target
    });
  };


  const containerStyle = {
    background: styles.containerBackground,
    color: styles.containerTextColor,
    headlineColor: styles.contentHeadlineTextColor,
    border: `${styles.borderWidth || 0}px ${styles.borderStyle || 'solid'} ${styles.borderColor}`,
    borderRadius: `${styles.borderRadius}px`
  };
  const headerStyle = {
    background: styles.headerBackground,
    color: styles.headerTextColor,
    border: `${styles.borderWidth || 0}px ${styles.borderStyle || 'solid'} ${styles.borderColor}`,
    borderRadius: `${styles.borderRadius}px`
  };
  return (

    <section style={containerStyle} className='product-template-bump-offer'>
      <div style={headerStyle} className='template-bump-offer-title'>
        <input
          type='checkbox'
          id='bump-offer-checkbox'
          disabled
        />
        <label id='bump-offer-checkbox-label' htmlFor='bump-offer-checkbox'>
          <EditableField
            name='content.title'
            // color={headerStyle.color}
            value={content.title}
            defaultValue='Offer Title Goes Here'
            onChange={onChange}
            className='template-bump-offer-title-input'
          />
        </label>
      </div>
      <div style={{ color: containerStyle.color }} className='template-bump-offer-description'>
        <EditableField
          name='content.introText'
          defaultValue='Offer intro statement'
          value={content.introText}
          onChange={onChange}
          className='template-bump-offer-description-title'
          style={{ color: containerStyle.headlineColor }}
        />
        <EditableField
          name='content.bodyText'
          defaultValue='Offer Description goes here,lorem'
          value={content.bodyText}
          onChange={onChange}
          textarea
          className='template-bump-offer-description-content'
        />
      </div>
    </section>
  );
};

export default BumpOffer;
