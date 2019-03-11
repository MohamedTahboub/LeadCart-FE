import React, { Component, useState } from 'react';
import common from '../common'

import './style.css';

const { EditableTextField } = common


export default ({ title, description, id, number, ...props }) => {

  const onChange = (id, { target: { value } }) => {
    if (value)
      props.onChange({ id, value })
  }
  return (
    <div className='upsell-feature-item'>
      <div className='upsell-feature-title'>
        <span className='feature-number'>{number}</span>
        <EditableTextField
          name='title'
          value={title}
          onChange={onChange.bind(this, id)}
        />
      </div>
      <div className='upsell-feature-description'>
        <EditableTextField
          name='description'
          value={description}
          onChange={onChange.bind(this, id)}
        />
      </div>
    </div>
  );

}

