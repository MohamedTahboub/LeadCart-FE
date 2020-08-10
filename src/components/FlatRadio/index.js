import React from 'react';
import clx from 'classnames';

import './style.css';

const FlatRadio = ({ value, name, onToggle, options }) => {
  const onRadioClick = (value) => {
    onToggle({ name, value });
  };
  return (
    <div className='flat-radio'>
      {
        options.map((option) => <div className={clx('flat-radio-key', { active: value === option.value })} onClick={() => onRadioClick(option.value)}>{option.label}</div>)
      }
    </div>
  );
};

export default FlatRadio;
