import React from 'react';
import 'react-toggle/style.css';
import Toggle from 'react-toggle';

import common from 'components/common';
import { useContext } from '../../../../../../actions';
import './style.css';
const {
  LayoutSwitch,
  ResizableTextarea,
  ResizableInput
} = common;
const BumpOffer = ({ section = {} }) => {
  const {
    styles = {},
    content = {}
  } = section;
  const { actions } = useContext();

  const { toggleInput = 'classic' } = styles;
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
        <LayoutSwitch active={toggleInput}>
          <Toggle
            id='modern'
            className='margin-right-10'
            checked={content.checked}
          />
          <span id='classic'>
            <input
              type='checkbox'
              id='bump-offer-checkbox'
              checked={content.checked}
              disabled
            />
          </span>
        </LayoutSwitch>
        <label id='bump-offer-checkbox-label' htmlFor='bump-offer-checkbox'>
          <ResizableInput
            name='content.title'
            value={content.title}
            onChange={onChange}
            className='template-bump-offer-title-input'
          />
        </label>
      </div>
      <div style={{ color: containerStyle.color }} className='template-bump-offer-description'>
        <ResizableInput
          name='content.introText'
          value={content.introText}
          onChange={onChange}
          className='template-bump-offer-description-title truncate'
          style={{
            color: containerStyle.headlineColor,
            textDecoration: 'underline',
            fontWeight: 'bold',
            width: '100%'
          }}
        />
        <ResizableTextarea
          name='content.bodyText'
          value={content.bodyText}
          onChange={onChange}
          className='template-bump-offer-description-content'
        />
      </div>
    </section>
  );
};

export default BumpOffer;
