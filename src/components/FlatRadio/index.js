import React from 'react';
import clx from 'classnames';

import './style.css';

const FlatRadio = ({ value, name, onToggle, options, className }) => {
  const onRadioClick = (value) => {
    onToggle({ name, value });
  };
  const classNames = clx('flat-radio', className);
  return (
    <div className={classNames}>
      {
        options.map((option) => <div className={clx('flat-radio-key', { active: value === option.value })} onClick={() => onRadioClick(option.value)}>{option.label}</div>)
      }
    </div>
  );
};

export default FlatRadio;
