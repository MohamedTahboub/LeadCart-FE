import React, { Component, useState } from 'react';
import common from '../common'

import './style.css';

const { EditableTextField } = common


export default ({ title, text, id, number, ...props }) => {

  const onChange = ({ target: { name, value } }) => {
    //   if (value){
    //   props.onChange && props.onChange({
    //       id,
    //       value: {
    //         title,
    //         text,
    //         [name]: value
    //       }
    //     })
    // }
  }
  
  return (
    <div className='upsell-feature-item'>
      <span onClick={() => props.onRemove(id)} className="feature-delete-btn">
        <i class="fas fa-trash-alt"></i>
      </span>
      <div className='upsell-feature-title'>
        <span className='feature-number'>{number}</span>
        <EditableTextField
          name='title'
          value={title}
          onBlur={onChange}
        />
      </div>
      <div className='upsell-feature-description'>
        <EditableTextField
          name='text'
          value={text}
          onBlur={onChange}
        />
      </div>
    </div>
  );

}

