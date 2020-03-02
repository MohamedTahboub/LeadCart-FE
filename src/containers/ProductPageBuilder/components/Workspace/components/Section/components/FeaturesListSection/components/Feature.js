import React from 'react';
import common from 'components/common';

const { EditableField } = common;

const Feature = ({
  className,
  color = 'rgb(142, 209, 252)',
  id,
  onChange,
  onDelete,
  text
}) => (
  <div className='section-feature-item'>
    <span style={{ background: color }} className='feature-item-point'>{id + 1}</span>
    <EditableField
      className='feature-item-input'
      name={id}
      defaultValue='Feature description'
      onChange={onChange}
      value={text}
      textarea
    />
    <span
      onClick={() => onDelete(id)}
      className='feature-item-delete-btn'
      role='presentation'
    >
      <i className='fas fa-trash-alt' />
    </span>
  </div>
);

export default Feature;
